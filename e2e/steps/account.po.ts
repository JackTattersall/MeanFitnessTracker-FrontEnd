import {browser, by, element} from 'protractor';

export class AccountDetailPage {

  navigateTo() {
    return browser.get('account');
  }

  getEmailText() {
    return element(by.id('account-email')).getAttribute('value');
  }

  getEmailInput() {
    return element(by.id('account-email'));
  }

  getPasswordOneText() {
    return element(by.id('account-password')).getAttribute('value');
  }

  getPasswordOneInput() {
    return element(by.id('account-password'));
  }

  getPasswordTwoText() {
    return element(by.id('account-password-2')).getAttribute('value');
  }

  getPasswordTwoField() {
    return element(by.id('account-password-2'));
  }

  emailEditButton() {
    return element(by.id('account-email-button'));
  }

  emailEditYesButton() {
    return element(by.id('account-email-edit-yes'));
  }

  emailEditNoButton() {
    return element(by.id('account-email-edit-no'));
  }

  emailValidText() {
    return element(by.id('account-email-valid')).getText();
  }

  emailRequiredText() {
    return element(by.id('account-email-required')).getText();
  }

  passwordEditButton() {
    return element(by.id('account-password-button'));
  }

  passwordEditYesButton() {
    return element(by.id('account-password-edit-yes'));
  }

  passwordEditNoButton() {
    return element(by.id('account-password-edit-no'));
  }

  passwordValidText() {
    return element(by.id('account-password-valid')).getText();
  }

  passwordRequiredText() {
    return element(by.id('account-password-required')).getText();
  }

  passwordsMustMatchText() {
    return element(by.id('account-passwords-must-match'));
  }
}
