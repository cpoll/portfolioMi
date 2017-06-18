import { PortfolioMiPage } from './app.po';

describe('portfolio-mi App', () => {
  let page: PortfolioMiPage;

  beforeEach(() => {
    page = new PortfolioMiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
