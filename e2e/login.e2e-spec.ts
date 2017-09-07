import {LoginPage} from './login.po';

describe('fitness-tracker Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
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
});
