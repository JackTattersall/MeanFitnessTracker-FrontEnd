import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {Subject} from "rxjs/Subject";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import has = Reflect.has;
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user.model";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  class StubUser{
    constructor(private firstName, private secondName, private email, private jwt, private userId){}
  }

  const testUser = new StubUser('jack', 'tatts', 'jack@tatt', 'jwt', 1);

  let mockAuth = {
    signIn: () => Observable.of(testUser),
    setUser: jasmine.createSpy('setUser')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockRoute = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute }
      ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll((done) => {
    localStorage.clear();
    done();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('on ngOninit, initForm should be called', () => {
    const spy = spyOn(component, 'initForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('initForm should initialize loginForm', () => {
    component.initForm();
    fixture.detectChanges();
    expect(has(component.loginForm['_value'], 'email')).toBeTruthy();
    expect(has(component.loginForm['_value'], 'password')).toBeTruthy();
  });

  it('onSubmit should initialize user and call setUser, set jwt and id and call navigate', () => {
    let expectedUser = new User();
    expectedUser.email = 'jack@tatt';
    expectedUser.firstName = 'jack';
    expectedUser.secondName = 'tatts';

    component.onSubmit();
    expect(localStorage.getItem('jwt')).toEqual('jwt');
    expect(localStorage.getItem('userId')).toEqual('1');
    expect(mockAuth.setUser).toHaveBeenCalledWith(expectedUser);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('loginForm should update when user enter details', () => {
    component.initForm();
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#login-email'));
    const passwordInput = fixture.debugElement.query(By.css('#login-password'));
    let emailInputElement = emailInput.nativeElement;
    let passwordInputElement = passwordInput.nativeElement;

    emailInputElement.value = 'jim@jim';
    passwordInputElement.value = 'pass';
    emailInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.dispatchEvent(new Event('input'));

    expect(component.email.value).toEqual('jim@jim');
    expect(component.password.value).toEqual('pass');
  });

  it('if onSubmit fails to sign in, the login form is reset', () => {

    fixture.debugElement.injector.get(AuthenticationService).signIn = () => Observable.throw({});
    component.initForm();
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#login-email'));
    const passwordInput = fixture.debugElement.query(By.css('#login-password'));
    let emailInputElement = emailInput.nativeElement;
    let passwordInputElement = passwordInput.nativeElement;

    emailInputElement.value = 'jim@jim';
    passwordInputElement.value = 'pass';
    emailInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.dispatchEvent(new Event('input'));

    expect(component.email.value).toEqual('jim@jim');
    expect(component.password.value).toEqual('pass');

    component.onSubmit();

    expect(component.email.value).toEqual(null);
    expect(component.password.value).toEqual(null);
  })
});
