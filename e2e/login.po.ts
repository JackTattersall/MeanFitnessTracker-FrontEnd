import {browser, by, element, ExpectedConditions} from 'protractor';

export class LoginPage {

  until = ExpectedConditions;

  navigateTo() {
    return browser.get('/login');
  }

  getEmailText() {
    return element(by.id('login-email')).getAttribute('value');
  }

  setEmailText(text: string) {
    element(by.id('login-email')).sendKeys(text);
  }

  getEmailRequiredText() {
    browser.wait(this.until.presenceOf(element(by.id('login-email-required'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('login-email-required')).getText();
  }

  getEmailValidText() {
    browser.wait(this.until.presenceOf(element(by.id('login-email-valid'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('login-email-valid')).getText();
  }

  getPasswordText() {
    return element(by.id('login-password')).getAttribute('value');
  }

  setPasswordText(text: string) {
    element(by.id('login-password')).sendKeys(text);
  }

  getPasswordRequiredText() {
    browser.wait(this.until.presenceOf(element(by.id('login-password-required'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.id('login-assword-required')).getText();
  }

  submitButton() {
    return element(by.id('login-submit'));
  }

  clickEmail() {
    element(by.id('login-email')).click();
  }

  clickPassword() {
    element(by.id('login-password')).click();
  }
}
