import { ZombicidePage } from './app.po';

describe('zombicide App', function() {
  let page: ZombicidePage;

  beforeEach(() => {
    page = new ZombicidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
