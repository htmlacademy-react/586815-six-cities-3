import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../../utils/mocks';
import OfferCard from './offer-card';
import { AppRoute } from '../../../const/const';

describe('Component: OfferCard', (() => {
  it('should render correctly', () => {
    const offerCardContainerTestId = 'offer-card-container';
    const withHistoryComponent = withHistory(<OfferCard cardData={makeFakeOffer()} />, [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(offerCardContainerTestId)).toBeInTheDocument();
  });
}));
