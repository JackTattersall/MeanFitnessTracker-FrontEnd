import { FitnessTrackerPage } from './app.po';

describe('fitness-tracker App', () => {
  let page: FitnessTrackerPage;

  beforeEach(() => {
    page = new FitnessTrackerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
