import {SharedSteps} from '../steps/shared.po';
import {AccountDetailPage} from '../steps/account.po';

describe('fitness-tracker Login', () => {
  let shared: SharedSteps;
  let account: AccountDetailPage;

  beforeAll(() => {
    shared = new SharedSteps();
    shared.iAmLoggedIn();
    expect(shared.isHomePage).toBeTruthy();
    account = new AccountDetailPage();
    account.navigateTo();
  });

  describe('email field', () => {

    it('should not be editable by default', () => {
      expect(account.getEmailInput().getAttribute('readonly')).toBeTruthy();
    });

    it('should display the current logged-in users email', () => {
      expect(account.getEmailText()).toBe('bill@bailey.com');
    });

    it('should have the edit button attached to it default', () => {
      expect(account.emailEditButton().isPresent()).toBeTruthy();
    });

    describe('when the edit button is clicked', () => {

      it('should become editable', () => {
        account.emailEditButton().click();
        expect(account.getEmailInput().getAttribute('readonly')).toBeFalsy();
      });

      it('should have the tick and cross button attached to it', () => {
        expect(account.emailEditYesButton().isPresent()).toBeTruthy();
        expect(account.emailEditNoButton().isPresent()).toBeTruthy();
      });

      it('the tick button should be disabled by default', () => {
        expect(account.emailEditYesButton().isEnabled()).toBeFalsy();
      });

      it('the cross button should be enabled by default', () => {
        expect(account.emailEditNoButton().isEnabled()).toBeTruthy();
      });

      it('should display no text', () => {
        expect(account.getEmailText()).toBe('');
      });

      it('should show validation text when no text entered and has been touched, and the tick box remains disabled', () => {
        account.getEmailInput().sendKeys('');
        account.getPasswordOneInput().click();
        expect(account.emailRequiredText()).toBe('Required');
      });

      it('should show validation text when email malformed and it has been touched, and the tick box remains disabled', () => {
        account.getEmailInput().sendKeys('noAtSign');
        account.getPasswordOneInput().click();
        expect(account.emailValidText()).toBe('Must be a valid email');
      });

      it('the tick box should become enabled when valid email entered', () => {
        account.getEmailInput().clear();
        account.getEmailInput().sendKeys('test@test.com');
        expect(account.emailEditYesButton().isEnabled()).toBeTruthy();
      });
    });

  });

  it('test run', () => {
    expect(true).toBeTruthy();
  });

});
