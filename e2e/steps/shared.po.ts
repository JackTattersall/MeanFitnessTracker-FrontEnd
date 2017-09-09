import {browser, by, element, ExpectedConditions} from 'protractor';

export class SharedSteps {

  isLoginPage() {
    const el = element(by.tagName('h3'));
    return el.getText();
  }

  // const EC = protractor.ExpectedConditions;
  // browser.wait(EC.urlContains('my-url'), 5000);
}
