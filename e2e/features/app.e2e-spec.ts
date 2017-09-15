import { FitnessTrackerPage } from '../steps/app.po';

describe('fitness-tracker App', () => {
  let page: FitnessTrackerPage;

  beforeEach(() => {
    page = new FitnessTrackerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText().then((heading) => {
      return heading.includes('Welcome to Your Fitness Tracker');
    })).toBeTruthy();
  });

});
