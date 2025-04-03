import { render, screen, waitFor } from '@testing-library/react';
import Offer from './offer';
import { withHistory, withStore } from '../utils/mock-component';
import { makeFakeDetailedOffer, makeFakeStore } from '../utils/mocks';
import { AppRoute } from '../const';

describe('Component: Offer page', (() => {
  it('should render correctly', () => {
    const offerContainerTestId = 'offer-page-container';
    const withHistoryComponent = withHistory(<Offer />, [AppRoute.Offer]);
    const { withStoreComponent, mockAxiosAdapter } = withStore(withHistoryComponent, makeFakeStore());
    mockAxiosAdapter.onGet().reply(200, makeFakeDetailedOffer());

    render(withStoreComponent);

    waitFor(() => {
      expect(screen.getByTestId(offerContainerTestId)).toBeInTheDocument();
    });
  });
}));
