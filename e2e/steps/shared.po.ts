import {browser, by, element, ExpectedConditions} from 'protractor';
import {LoginPage} from './login.po';

export class SharedSteps {

  until = ExpectedConditions;
  logIn = new LoginPage();

  isHomePage() {
    browser.wait(this.until.presenceOf(element(by.tagName('h3'))), 5000);
    const el = element(by.tagName('h3'));
    return el.getText();
  }

  logout() {
    return element(by.id('logout-button'));
  }

  isLoginPage() {
    return browser.wait(this.until.urlContains('login'), 5000);
  }

  isAccountPage() {
    return browser.wait(this.until.urlContains('account'), 5000);
  }

  iAmLoggedIn() {
    this.logIn.navigateTo();
    this.logIn.setEmailText('bill@bailey.com');
    this.logIn.setPasswordText('qwerty123');
    this.logIn.submitButton().click();
    browser.wait(this.until.presenceOf(element(by.tagName('h3'))), 5000);
  }
  // browser.wait(EC.urlContains('my-url'), 5000);
}
