import { render, screen } from '@testing-library/react';
import OffersSection from './offers-section';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { AppRoute, CITIES } from '../../const';

describe('Component: OffersSection', (() => {
  it('should render correctly', () => {
    const offersSectionContainerTestId = 'offers-section-container';
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const withHistoryComponent = withHistory(<OffersSection offers={mockOffers} currentCity={CITIES[0]} currentCityLocation={mockOffers[0].city.location} />, [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());


    render(withStoreComponent);

    expect(screen.getByTestId(offersSectionContainerTestId)).toBeInTheDocument();
  });
}));
