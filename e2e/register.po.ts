import {browser, by, element, ExpectedConditions} from 'protractor';

export class RegisterPage {

  until = ExpectedConditions;

  navigateTo() {
    return browser.get('/register');
  }

  getFirstNameText() {
    return element(by.id('register-first-name')).getAttribute('value');
  }

  setFirstNameText(text: string) {
    element(by.id('register-first-name')).sendKeys(text);
  }

  getFirstNameRequiredText() {
    browser.wait(this.until.presenceOf(element(by.id('register-name-required'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-name-required')).getText();
  }

  getSecondNameText() {
    return element(by.id('register-second-name')).getAttribute('value');
  }

  setSecondNameText(text: string) {
    element(by.id('register-second-name')).sendKeys(text);
  }

  getSecondNameRequiredText() {
    browser.wait(
      this.until.presenceOf(element(by.id('register-second-name-required'))), 5000, 'Element taking too long to appear in the DOM'
    );
    return element(by.id('register-second-name-required')).getText();
  }

  getEmailText() {
    return element(by.id('register-email')).getAttribute('value');
  }

  setemailText(text: string) {
    element(by.id('register-email')).sendKeys(text);
  }

  getEmailRequiredText() {
    browser.wait(this.until.presenceOf(element(by.id('register-email-required'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-email-required')).getText();
  }

  getEmailValidText() {
    browser.wait(this.until.presenceOf(element(by.id('register-email-valid'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-email-valid')).getText();
  }

  getPasswordText() {
    return element(by.id('register-password')).getAttribute('value');
  }

  setPasswordText(text: string) {
    element(by.id('register-password')).sendKeys(text);
  }

  getPasswordRequiredText() {
    browser.wait(this.until.presenceOf(element(by.id('register-password-required'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-password-required')).getText();
  }

  getPasswordValidText() {
    browser.wait(this.until.presenceOf(element(by.id('register-password-valid'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-password-valid')).getText();
  }

  getPasswordTwoText() {
    return element(by.id('register-retype-password')).getAttribute('value');
  }

  setPasswordTwoText(text: string) {
    element(by.id('register-retype-password')).sendKeys(text);
  }

  getPasswordTwoRequiredText() {
    browser.wait(this.until.presenceOf(element(by.id('register-pass-two-required'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-pass-two-required')).getText();
  }

  getPasswordTwoValidText() {
    browser.wait(this.until.presenceOf(element(by.id('register-pass-two-valid'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-pass-two-valid')).getText();
  }

  getPasswordsMatchText() {
    browser.wait(this.until.presenceOf(element(by.id('register-passwords-match'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('register-passwords-match')).getText();
  }

  clickRow() {
    element(by.id('register-row')).click();
  }

  clickFirstName() {
    element(by.id('register-first-name')).click();
  }

  submitButton() {
    return element(by.id('register-submit'));
  }
}
