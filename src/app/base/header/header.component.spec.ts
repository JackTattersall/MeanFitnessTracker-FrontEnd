import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockAuthService = {
    isLoggedIn: jasmine.createSpy('isLoggedIn()'),
    logout: jasmine.createSpy('logout()')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('auth service logout should be called on logout', () => {
    component.onLogout();
    fixture.detectChanges();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('auth service isLoggedIn should be called on isLoggedIn', () => {
    component.isLoggedIn();
    fixture.detectChanges();
    expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
  });

  it('router navigate should be called on logout', () => {
    component.onLogout();
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
