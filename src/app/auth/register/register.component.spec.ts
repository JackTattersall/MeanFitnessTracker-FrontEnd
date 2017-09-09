import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';

import has = Reflect.has;
import Spy = jasmine.Spy;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  class StubUser {
    constructor(private firstName, private secondName, private email, private jwt, private userId) {
    }
  }

  const testUser = new StubUser('jack', 'tatts', 'jack@tatt', 'jwt', 1);

  const mockAuth = {
    register: () => Observable.of(testUser),
    setUser: jasmine.createSpy('setUser')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockRoute = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      providers: [
        FormBuilder,
        {provide: AuthenticationService, useValue: mockAuth},
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockRoute}
      ],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('on ngOninit, initForm should be called', () => {
    const spy = spyOn(component, 'initForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('initForm should initialize registerForm', () => {
    component.initForm();
    fixture.detectChanges();
    expect(has(component.registerForm['_value'], 'email')).toBeTruthy();
    expect(has(component.registerForm['_value'], 'passwordOne')).toBeTruthy();
    expect(has(component.registerForm['_value'], 'firstName')).toBeTruthy();
    expect(has(component.registerForm['_value'], 'passwordTwo')).toBeTruthy();
    expect(has(component.registerForm['_value'], 'secondName')).toBeTruthy();
  });

  it('if form is filled correctly and onSubmit success, then call register, then call setUser and then navigate away', () => {

    component.initForm();
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#register-email')).nativeElement;
    const firstNameInput = fixture.debugElement.query(By.css('#register-first-name')).nativeElement;
    const secondNameInput = fixture.debugElement.query(By.css('#register-second-name')).nativeElement;
    const passwordOneInput = fixture.debugElement.query(By.css('#register-password')).nativeElement;
    const passwordTwoInput = fixture.debugElement.query(By.css('#register-retype-password')).nativeElement;

    emailInput.value = 'test@tester';
    secondNameInput.value = 'tester';
    firstNameInput.value = 'test';
    passwordOneInput.value = '123456';
    passwordTwoInput.value = '1234567';

    emailInput.dispatchEvent(new Event('input'));
    firstNameInput.dispatchEvent(new Event('input'));
    secondNameInput.dispatchEvent(new Event('input'));
    passwordTwoInput.dispatchEvent(new Event('input'));
    passwordOneInput.dispatchEvent(new Event('input'));

    // Lets test passwords match whilst we have all this set-up and before we spy on it
    expect(component.passwordsMatch()).toBeFalsy();

    passwordTwoInput.value = '123456';
    passwordTwoInput.dispatchEvent(new Event('input'));

    expect(component.passwordsMatch()).toBeTruthy();
    // ---------------------------------------------------------------------------------

    const spy = spyOn(component, 'passwordsMatch').and.returnValue(true);

    component.onSubmit();

    // Test form picks up valid values
    expect(component.email.value).toEqual('test@tester');
    expect(component.firstName.value).toEqual('test');
    expect(component.secondName.value).toEqual('tester');
    expect(component.passwordOne.value).toEqual('123456');
    expect(component.passwordTwo.value).toEqual('123456');

    // Test register completes and fires set user and navigate
    expect(mockAuth.setUser).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();

  });

  it('on onSubmit register fails, then form is cleared', () => {
    component.initForm();
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#register-email')).nativeElement;
    const firstNameInput = fixture.debugElement.query(By.css('#register-first-name')).nativeElement;
    const secondNameInput = fixture.debugElement.query(By.css('#register-second-name')).nativeElement;
    const passwordOneInput = fixture.debugElement.query(By.css('#register-password')).nativeElement;
    const passwordTwoInput = fixture.debugElement.query(By.css('#register-retype-password')).nativeElement;

    emailInput.value = 'test@tester';
    secondNameInput.value = 'tester';
    firstNameInput.value = 'test';
    passwordOneInput.value = '123456';
    passwordTwoInput.value = '123456';

    emailInput.dispatchEvent(new Event('input'));
    firstNameInput.dispatchEvent(new Event('input'));
    secondNameInput.dispatchEvent(new Event('input'));
    passwordTwoInput.dispatchEvent(new Event('input'));
    passwordOneInput.dispatchEvent(new Event('input'));

    // Test form has values
    expect(component.email.value).toEqual('test@tester');
    expect(component.firstName.value).toEqual('test');
    expect(component.secondName.value).toEqual('tester');
    expect(component.passwordOne.value).toEqual('123456');
    expect(component.passwordTwo.value).toEqual('123456');

    // Make register fail
    fixture.debugElement.injector.get(AuthenticationService).register = () => Observable.throw({});

    // Submit
    component.onSubmit();

    // Check form emptied
    expect(component.email.value).toEqual(null);
    expect(component.firstName.value).toEqual(null);
    expect(component.secondName.value).toEqual(null);
    expect(component.passwordOne.value).toEqual(null);
    expect(component.passwordTwo.value).toEqual(null);
  });

  it(`on onSubmit, if error contains "Account with this email already exists"
   then emailNotUnique is called`, () => {

    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#register-email')).nativeElement;
    const firstNameInput = fixture.debugElement.query(By.css('#register-first-name')).nativeElement;
    const secondNameInput = fixture.debugElement.query(By.css('#register-second-name')).nativeElement;
    const passwordOneInput = fixture.debugElement.query(By.css('#register-password')).nativeElement;
    const passwordTwoInput = fixture.debugElement.query(By.css('#register-retype-password')).nativeElement;

    emailInput.value = 'test@tester';
    secondNameInput.value = 'tester';
    firstNameInput.value = 'test';
    passwordOneInput.value = '123456';
    passwordTwoInput.value = '123456';

    emailInput.dispatchEvent(new Event('input'));
    firstNameInput.dispatchEvent(new Event('input'));
    secondNameInput.dispatchEvent(new Event('input'));
    passwordTwoInput.dispatchEvent(new Event('input'));
    passwordOneInput.dispatchEvent(new Event('input'));

    const emailNotUniqueSpy: Spy = spyOn(component, 'emailNotUnique');
    const passwordsMatchSpy: Spy = spyOn(component, 'passwordsMatch').and.returnValue(true);

    // Make register fail
    fixture.debugElement.injector.get(AuthenticationService).register = () => Observable.throw({
      message: 'Account with this email already exists'
    });

    // Submit
    component.onSubmit();

    expect(emailNotUniqueSpy).toHaveBeenCalled();
  });

  it('emailNotUnique should set form value of email to empty and set emailUnique to false', () => {
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#register-email')).nativeElement;
    emailInput.value = 'test@tester';
    emailInput.dispatchEvent(new Event('input'));

    expect(component.email.value).toEqual('test@tester');
    expect(component.emailUnique).toBeTruthy();

    component.emailNotUnique();

    expect(component.email.value).toEqual('');
    expect(component.emailUnique).toBeFalsy();
  });
});
