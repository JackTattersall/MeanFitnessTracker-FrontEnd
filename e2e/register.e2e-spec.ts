import { RegisterPage } from './register.po';

describe('fitness-tracker Register', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it('should accept first name', () => {
    page.navigateTo();
    page.setFirstNameText('jack');
    expect(page.getFirstNameText()).toEqual('jack');
  });

  it('should accept second name', () => {
    page.navigateTo();
    page.setSecondNameText('jack');
    expect(page.getSecondNameText()).toEqual('jack');
  });

  it('should accept email', () => {
    page.navigateTo();
    page.setemailText('jack@tatts');
    expect(page.getEmailText()).toEqual('jack@tatts');
  });

  it('should accept password one', () => {
    page.navigateTo();
    page.setPasswordText('password');
    expect(page.getPasswordText()).toEqual('password');
  });

  it('should accept password two', () => {
    page.navigateTo();
    page.setPasswordTwoText('password');
    expect(page.getPasswordTwoText()).toEqual('password');
  });

  it('should verify required on first name', () => {
    page.navigateTo();
    page.setFirstNameText('');
    page.clickRow();
    expect(page.getFirstNameRequiredText()).toEqual('Required');
  });

  it('should verify required on second name', () => {
    page.navigateTo();
    page.setSecondNameText('');
    page.clickRow();
    expect(page.getSecondNameRequiredText()).toEqual('Required');
  });

  it('should verify required on email', () => {
    page.navigateTo();
    page.setemailText('');
    page.clickFirstName();
    expect(page.getEmailRequiredText()).toEqual('Required');
  });

  it('should verify valid on email', () => {
    page.navigateTo();
    page.setemailText('jacky');
    page.clickFirstName();
    expect(page.getEmailValidText()).toEqual('Must be a valid email');
  });

  it('should verify required on password one', () => {
    page.navigateTo();
    page.setPasswordText('');
    page.clickRow();
    expect(page.getPasswordRequiredText()).toEqual('Required');
  });

  it('should verify minimum length on password one', () => {
    page.navigateTo();
    page.setPasswordText('12345');
    page.clickRow();
    expect(page.getPasswordValidText()).toEqual('Must be at least 6 characters long');
  });

  it('should verify required on password two', () => {
    page.navigateTo();
    page.setPasswordTwoText('');
    page.clickRow();
    expect(page.getPasswordTwoRequiredText()).toEqual('Required');
  });

  it('should verify minimum length on password two', () => {
    page.navigateTo();
    page.setPasswordTwoText('12345');
    page.clickRow();
    expect(page.getPasswordTwoValidText()).toEqual('Must be at least 6 characters long');
  });

  it('should verify both passwords are equal', () => {
    page.navigateTo();
    page.setPasswordText('123456');
    page.setPasswordTwoText('1234567');
    page.clickRow();
    expect(page.getPasswordsMatchText()).toEqual('Passwords must match');
  });

  it('submit should be disabled until all inputs are filled and verified', () => {
    page.navigateTo();
    page.setFirstNameText('jack');
    expect(page.submitButton().isEnabled()).toBe(false);
    page.setSecondNameText('tatts');
    expect(page.submitButton().isEnabled()).toBe(false);
    page.setemailText('jack@tatt');
    expect(page.submitButton().isEnabled()).toBe(false);
    page.setPasswordText('123456');
    expect(page.submitButton().isEnabled()).toBe(false);
    page.setPasswordTwoText('123456');
    expect(page.submitButton().isEnabled()).toBe(true);
  });

  it('should clear email and display, account with this email already exists, if email already exists', () => {
    page.navigateTo();
    page.setFirstNameText('bill');
    page.setSecondNameText('bailey');
    page.setemailText('bill@bailey.com');
    page.setPasswordText('123456');
    page.setPasswordTwoText('123456');

    page.submitButton().click();

    expect(page.getEmailAlreadyExistsText()).toBe('An account with this email already exists');
  });
});
