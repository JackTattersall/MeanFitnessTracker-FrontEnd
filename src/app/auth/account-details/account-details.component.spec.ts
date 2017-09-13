import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AccountDetailsComponent } from './account-details.component';
import {AbstractControl, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user.model';
import Spy = jasmine.Spy;
import {By} from '@angular/platform-browser';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  let initFormSpy: Spy;

  const testUser = new User();
  testUser.firstName = 'test';
  testUser.secondName = 'tester';
  testUser.email = 'test@tester.com';

  const mockAuth = {
    userChanged: Observable.of(testUser),
    getUser: jasmine.createSpy('getUser'),
    updateUser: () => Observable.of(testUser),
    setUser: () => {}
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
    initFormSpy = spyOn(component, 'initForm');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOninit', () => {

    it('should instantiate userSub, call initForm, and call getUser', () => {
      component.ngOnInit();

      expect(component.userSub).toBeDefined();
      expect(initFormSpy).toHaveBeenCalled();
      expect(mockAuth.getUser).toHaveBeenCalled();
    });

    it('should set user to and emailValue to user and its email returned by subscription', () => {
      component.ngOnInit();

      expect(component.user).toBe(testUser);
      expect(component.emailValue).toBe(testUser.email);
    });
  });

  describe('ngOnDestroy', () => {

    it('should un-subscribe userSub', fakeAsync(() => {
      component.ngOnInit();
      component.ngOnDestroy();

      expect(component.userSub.closed).toBeTruthy();
    }));
  });

  describe('initForm', () => {

    it('should instantiate editForm with correct values', () => {

      component.initForm();

      // Values
      expect(component.editForm.value.hasOwnProperty('email')).toBeTruthy();
      expect(component.editForm.value.hasOwnProperty('passwordTwo')).toBeTruthy();
      expect(component.editForm.value.hasOwnProperty('password')).toBeTruthy();

      // Email validators
      expect(component.editForm.controls.email.errors.hasOwnProperty('required')).toBeTruthy();
      expect(component.editForm.controls.email.errors.hasOwnProperty('email')).toBeTruthy();

      // Password Validators
      expect(component.editForm.controls.password.errors.hasOwnProperty('required')).toBeTruthy();

      // PasswordTwo Validators
      expect(component.editForm.controls.passwordTwo.errors.hasOwnProperty('required')).toBeTruthy();
    });
  });

  describe('onSubmit', () => {

    it('should call get email', () => {
      const getEmailSpy: Spy = spyOnProperty(component, 'email', 'get').and.returnValue({value: 't@t.com'});
      component.onSubmit();

      expect(getEmailSpy).toHaveBeenCalled();
    });

    it('should call get password', () => {
      const getPasswordSpy: Spy = spyOnProperty(component, 'password', 'get').and.returnValue({value: 'pass'});
      component.onSubmit();

      expect(getPasswordSpy.calls.count()).toBe(2);
    });

    describe('getUser', () => {

      beforeEach(() => {
        // create return values to continue the function
        const getEmailSpy: Spy = spyOnProperty(component, 'email', 'get').and.returnValue({value: 't@t.com'});
        const getpasswordSpy: Spy = spyOnProperty(component, 'password', 'get').and.returnValue({value: 'pass'});
      });

      it('should be called on submit', () => {

        // get injected service and spy on its updateUser function
        const updateUserSpy: Spy = spyOn(fixture.debugElement.injector.get(AuthenticationService), 'updateUser')
          .and.returnValue(Observable.of(testUser));

        component.onSubmit();

        const getUser = new User();
        getUser.email = 't@t.com';
        getUser.password = 'pass';

        expect(updateUserSpy).toHaveBeenCalledWith(getUser);
      });

      it('if it succeeds, setUser should be called', () => {

        // get injected service and mock its updateUser to return test user
        const updateUserSpy: Spy = spyOn(fixture.debugElement.injector.get(AuthenticationService), 'updateUser')
          .and.returnValue(Observable.of(testUser));

        // get injected service and spy on its setUser function
        const setUserSpy: Spy = spyOn(fixture.debugElement.injector.get(AuthenticationService), 'setUser');

        component.onSubmit();

        expect(setUserSpy).toHaveBeenCalledWith(testUser);
      });

      it('if it fails, error should be logged', () => {

        // get injected service and mock its updateUser to throw an error
        const updateUserSpy: Spy = spyOn(fixture.debugElement.injector.get(AuthenticationService), 'updateUser')
          .and.returnValue(Observable.throw({}));

        const consoleSpy: Spy = spyOn(console, 'error');

        component.onSubmit();

        expect(consoleSpy).toHaveBeenCalled();
      });
    });

    describe('onEditEmail', () => {

      it('it should negate emailEditMode', () => {
        component.emailEditMode = true;

        component.onEditEmail();
        expect(component.emailEditMode).toBeFalsy();

        component.onEditEmail();
        expect(component.emailEditMode).toBeTruthy();
      });
    });

    describe('onEditPassword', () => {

      it('it should negate passwordEditMode', () => {
        component.passwordEditMode = true;

        component.onEditPassword();
        expect(component.passwordEditMode).toBeFalsy();

        component.onEditPassword();
        expect(component.passwordEditMode).toBeTruthy();
      });
    });

    describe('onEmailNo', () => {

      it('it should negate emailEditMode', () => {
        component.emailEditMode = true;

        component.onEmailNo();
        expect(component.emailEditMode).toBeFalsy();

        component.onEmailNo();
        expect(component.emailEditMode).toBeTruthy();
      });

      it('should reset email form control', () => {
          component.editForm.controls.email.setValue('test');

          component.onEmailNo();
          expect(component.editForm.controls.email.value).toBe(null);
      });

    });

    describe('onPasswordNo', () => {
      it('it should negate passwordEditMode', () => {
        component.passwordEditMode = true;

        component.onPasswordNo();
        expect(component.passwordEditMode).toBeFalsy();

        component.onPasswordNo();
        expect(component.passwordEditMode).toBeTruthy();
      });

      it('should reset password and passwordTwo form control', () => {
        component.editForm.controls.password.setValue('pass');
        component.editForm.controls.passwordTwo.setValue('passTwo');

        component.onPasswordNo();
        expect(component.editForm.controls.password.value).toBe(null);
        expect(component.editForm.controls.passwordTwo.value).toBe(null);
      });
    });

    describe('onEmailYes', () => {

      it('it should negate emailEditMode if email valid', () => {
        // set email return valid = true
        const getEmailSpy: Spy = spyOnProperty(component, 'email', 'get').and.returnValue({ valid: true});
        component.emailEditMode = true;

        component.onEmailYes();
        expect(component.emailEditMode).toBeFalsy();

        component.onEmailYes();
        expect(component.emailEditMode).toBeTruthy();
      });

      it('should call onSubmit if email valid', () => {
        // set email return valid = true
        const getEmailSpy: Spy = spyOnProperty(component, 'email', 'get').and.returnValue({ valid: true});
        const onSubmitSpy: Spy = spyOn(component, 'onSubmit');

        component.onEmailYes();
        expect(onSubmitSpy).toHaveBeenCalled();
      });

      it('should not call onSubmit and not negate emailEditMode if email invalid', () => {
        // set email return valid = false
        const getEmailSpy: Spy = spyOnProperty(component, 'email', 'get').and.returnValue({ valid: false});
        const onSubmitSpy: Spy = spyOn(component, 'onSubmit');
        component.emailEditMode = true;

        component.onEmailYes();

        expect(onSubmitSpy.calls.count()).toBe(0);
        expect(component.emailEditMode).toBeTruthy();
      });
    });

    describe('onPasswordYes', () => {

      it('it should negate passwordEditMode if password and passwordTwo valid', () => {
        // set password return valid = true
        const getPasswordSpy: Spy = spyOnProperty(component, 'password', 'get').and.returnValue({ valid: true});
        const getPasswordTwoSpy: Spy = spyOnProperty(component, 'passwordTwo', 'get').and.returnValue({ valid: true});
        component.passwordEditMode = true;

        component.onPasswordYes();
        expect(component.passwordEditMode).toBeFalsy();

        component.onPasswordYes();
        expect(component.passwordEditMode).toBeTruthy();
      });

      it('should call onSubmit if password and passwordTwo valid', () => {
        // set password return valid = true
        const getPasswordSpy: Spy = spyOnProperty(component, 'password', 'get').and.returnValue({ valid: true});
        const getPasswordTwoSpy: Spy = spyOnProperty(component, 'passwordTwo', 'get').and.returnValue({ valid: true});
        const onSubmitSpy: Spy = spyOn(component, 'onSubmit');

        component.onPasswordYes();
        expect(onSubmitSpy).toHaveBeenCalled();
      });

      it('should not call onSubmit and not negate passwordEditMode if password invalid', () => {
        // set password return valid = false
        const getPasswordSpy: Spy = spyOnProperty(component, 'password', 'get').and.returnValue({ valid: false});
        const passwordsMatch: Spy = spyOn(component, 'passwordsMatch').and.returnValue(true);
        const onSubmitSpy: Spy = spyOn(component, 'onSubmit');
        component.passwordEditMode = true;

        component.onPasswordYes();

        expect(onSubmitSpy.calls.count()).toBe(0);
        expect(component.passwordEditMode).toBeTruthy();
      });
    });

    it('should not call onSubmit and not negate passwordEditMode if passwords don\'t match', () => {
      // set password return valid = false
      const getPasswordSpy: Spy = spyOnProperty(component, 'password', 'get').and.returnValue({ valid: true});
      const passwordsMatch: Spy = spyOn(component, 'passwordsMatch').and.returnValue(false);
      const onSubmitSpy: Spy = spyOn(component, 'onSubmit');
      component.passwordEditMode = true;

      component.onPasswordYes();

      expect(onSubmitSpy.calls.count()).toBe(0);
      expect(component.passwordEditMode).toBeTruthy();
    });
  });

  describe('get email', () => {

    it('should return the email form control', () => {
      fixture.detectChanges();

      const emailInput = fixture.debugElement.query(By.css('#account-email')).nativeElement;
      emailInput.value = 'test@tester';
      emailInput.dispatchEvent(new Event('input'));

      expect(component.email instanceof AbstractControl).toBeTruthy();
      expect(component.email.value).toBe('test@tester');
    });
  });

  describe('get password', () => {

    it('should return the password form control', () => {
      fixture.detectChanges();

      const passwordInput = fixture.debugElement.query(By.css('#account-password')).nativeElement;
      passwordInput.value = 'pass1';
      passwordInput.dispatchEvent(new Event('input'));

      expect(component.email instanceof AbstractControl).toBeTruthy();
      expect(component.password.value).toBe('pass1');
    });
  });

  describe('get passwordTwo', () => {

    it('should return the passwordTwo form control', () => {
      fixture.detectChanges();

      // Make password 2 input visible
      component.passwordEditMode = true;
      fixture.detectChanges();

      const passwordTwoInput = fixture.debugElement.query(By.css('#account-password-2')).nativeElement;
      passwordTwoInput.value = 'pass2';
      passwordTwoInput.dispatchEvent(new Event('input'));

      expect(component.email instanceof AbstractControl).toBeTruthy();
      expect(component.passwordTwo.value).toBe('pass2');
    });
  });

  describe('emailRequiredError', () => {

    it('should return false if email input not empty', () => {
      component.initForm();
      fixture.detectChanges();

      const emailInput = fixture.debugElement.query(By.css('#account-email')).nativeElement;
      emailInput.value = 'test@tester';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.emailRequiredError()).toBeFalsy();
    });

    it('should return true if email input empty', () => {
      component.initForm();
      fixture.detectChanges();

      const emailInput = fixture.debugElement.query(By.css('#account-email')).nativeElement;
      emailInput.value = '';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.emailRequiredError()).toBeTruthy();
    });
  });

  describe('validEmailError', () => {

    it('should return false if email formed correctly', () => {
      component.initForm();
      fixture.detectChanges();

      const emailInput = fixture.debugElement.query(By.css('#account-email')).nativeElement;
      emailInput.value = 'test@tester';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.validEmailError()).toBeFalsy();
    });

    it('should return true if malformed email', () => {
      component.initForm();
      fixture.detectChanges();

      const emailInput = fixture.debugElement.query(By.css('#account-email')).nativeElement;
      emailInput.value = 'noAtSign';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.validEmailError()).toBeTruthy();
    });
  });

  describe('passwordRequiredError', () => {

    it('should return false if password not empty', () => {
      component.initForm();
      fixture.detectChanges();

      const passwordInput = fixture.debugElement.query(By.css('#account-password')).nativeElement;
      passwordInput.value = 'pass';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.passwordRequiredError()).toBeFalsy();
    });

    it('should return true if password empty', () => {
      component.initForm();
      fixture.detectChanges();

      const passwordInput = fixture.debugElement.query(By.css('#account-password')).nativeElement;
      passwordInput.value = '';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.passwordRequiredError()).toBeTruthy();
    });
  });

  describe('passwordMinLengthError', () => {

    it('should return false if password gretaer than 6 chars', () => {
      component.initForm();
      fixture.detectChanges();

      const passwordInput = fixture.debugElement.query(By.css('#account-password')).nativeElement;
      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.passwordMinLengthError()).toBeFalsy();
    });

    it('should return true if password less than 6 chars', () => {
      component.initForm();
      fixture.detectChanges();

      const passwordInput = fixture.debugElement.query(By.css('#account-password')).nativeElement;
      passwordInput.value = 'pass';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.passwordMinLengthError()).toBeTruthy();
    });
  });

  describe('passwordsMatch', () => {

    it('should return false if passwordOne and passwordTwo don\'t match', () => {
      component.initForm();
      fixture.detectChanges();

      // Make password 2 input visible
      component.passwordEditMode = true;
      fixture.detectChanges();

      const passwordInput = fixture.debugElement.query(By.css('#account-password')).nativeElement;
      const passwordTwoInput = fixture.debugElement.query(By.css('#account-password-2')).nativeElement;
      passwordInput.value = 'password';
      passwordTwoInput.value = 'passwor';
      passwordInput.dispatchEvent(new Event('input'));
      passwordTwoInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.passwordsMatch()).toBeFalsy();
    });

    it('should return true if passwordOne and passwordTwo match', () => {
      component.initForm();
      fixture.detectChanges();

      // Make password 2 input visible
      component.passwordEditMode = true;
      fixture.detectChanges();

      const passwordInput = fixture.debugElement.query(By.css('#account-password')).nativeElement;
      const passwordTwoInput = fixture.debugElement.query(By.css('#account-password-2')).nativeElement;
      passwordInput.value = 'password';
      passwordTwoInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));
      passwordTwoInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.passwordsMatch()).toBeTruthy();
    });
  });
});
