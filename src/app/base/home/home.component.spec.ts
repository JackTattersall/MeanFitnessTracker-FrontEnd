import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthenticationService} from '../../services/authentication.service';
import {TitalisePipe} from '../../shared/pipes/titalise.pipe';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs/Observable';
import {ReactiveFormsModule} from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const user = new User();
  user.firstName = 'test';
  user.secondName = 'tester';
  user.email = 'test@tester.com';

  const mockAuth = {
    userChanged: Observable.of(user),
    getUser: jasmine.createSpy('getUser')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitalisePipe, HomeComponent ],
      providers: [
        {provide: AuthenticationService, useValue: mockAuth}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('user should be set on init via subscription', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.user).toEqual(user);
  });

  it('getUser should be called on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockAuth.getUser).toHaveBeenCalled();
  });
});
