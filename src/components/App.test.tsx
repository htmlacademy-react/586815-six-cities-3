import { render, screen } from '@testing-library/react';
import { AppRoute } from '../const';
import App from './App';
import { makeFakeStore } from '../utils/mocks';
import { withHistory, withStore } from '../utils/mock-component';

describe('Application Routing', () => {
  let mockHistory: string[];

  beforeEach(() => {
    mockHistory = [];
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const mainPageContainerTestId = 'main-page-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageContainerTestId)).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer/:id"', async () => {
    const offerPageContainerTestId = 'offer-page-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Offer);

    render(withStoreComponent);
    const offerPageContainer = await screen.findByTestId(offerPageContainerTestId);
    expect(offerPageContainer).toBeInTheDocument();
  });
});
