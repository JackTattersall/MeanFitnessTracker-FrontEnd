import { browser, by, element } from 'protractor';

export class FitnessTrackerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h3')).getText();
  }
}
