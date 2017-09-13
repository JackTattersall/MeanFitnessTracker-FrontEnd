import {browser, by, element, ExpectedConditions} from 'protractor';

export class SharedSteps {

  until = ExpectedConditions;

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


  // browser.wait(EC.urlContains('my-url'), 5000);
}
