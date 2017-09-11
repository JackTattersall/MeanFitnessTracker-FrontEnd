import {LoginPage} from '../steps/login.po';
import {SharedSteps} from '../steps/shared.po';

describe('fitness-tracker Login', () => {
  let page: LoginPage;
  let shared: SharedSteps;

  beforeEach(() => {
    page = new LoginPage();
    shared = new SharedSteps();
  });

  it('should accept email', () => {
    page.navigateTo();
    page.setEmailText('jack@tatts');
    expect(page.getEmailText()).toEqual('jack@tatts');
  });

  it('should accept password', () => {
    page.navigateTo();
    page.setPasswordText('123456');
    expect(page.getPasswordText()).toEqual('123456');
  });

  it('should verify email required', () => {
    page.navigateTo();
    page.setEmailText('');
    page.clickPassword();
    expect(page.getEmailRequiredText()).toEqual('Required');
  });

  it('should verify email valid', () => {
    page.navigateTo();
    page.setEmailText('jack');
    page.clickPassword();
    expect(page.getEmailValidText()).toEqual('Must be a valid email');
  });

  it('should verify password required', () => {
    page.navigateTo();
    page.setPasswordText('');
    page.clickEmail();
    expect(page.getPasswordRequiredText()).toEqual('Required');
  });

  it('submit should be disabled until all inputs are filled and verified', () => {
    page.navigateTo();
    page.setEmailText('jack@tatts');
    expect(page.submitButton().isEnabled()).toBe(false);
    page.setPasswordText('123456');
    expect(page.submitButton().isEnabled()).toBe(true);
  });

  it('valid user should be logged in', () => {
    page.navigateTo();
    page.setEmailText('bill@bailey.com');
    page.setPasswordText('qwerty123');
    page.submitButton().click();

    expect(shared.isHomePage()).toContain('Welcome to Your Fitness Tracker');
  });

  it('logout should redirect to login page', () => {
    page.navigateTo();
    page.setEmailText('bill@bailey.com');
    page.setPasswordText('qwerty123');
    page.submitButton().click();

    expect(shared.isHomePage()).toContain('Welcome to Your Fitness Tracker');

    shared.logout().click();

    expect(shared.isLoginPage()).toBeTruthy();
  });
});
