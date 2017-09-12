import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsComponent } from './account-details.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user.model';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

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
      declarations: [ AccountDetailsComponent ],
      providers: [
        FormBuilder,
        {provide: AuthenticationService, useValue: mockAuth}
      ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
