import { browser, by, element } from 'protractor';

export class AppPage {
  pause() {
    browser.pause();
  }

  navigateTo() {
    return browser.get('/');
  }

}
