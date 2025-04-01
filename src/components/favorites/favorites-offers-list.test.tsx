import { render, screen } from '@testing-library/react';
import FavoritesOffersList from './favorites-offers-list';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { AppRoute, CITIES } from '../../const';
import { withStore, withHistory } from '../../utils/mock-component';

describe('Component: FavoritesOffersList', (() => {
  it('should render correctly', () => {
    const cityName = CITIES[0];
    const mockOffers = [makeFakeOffer(CITIES[0]), makeFakeOffer(CITIES[0])];
    const withHistoryComponent = withHistory(
      <FavoritesOffersList
        cityName={cityName}
        offers={mockOffers}
      />, [AppRoute.Favorites]);
    const { withStoreComponent } = withStore(withHistoryComponent,
      makeFakeStore({ favorites: { items: mockOffers } }));

    render(withStoreComponent);

    const offersCards = screen.getAllByRole('article');

    expect(screen.getByText(cityName)).toBeInTheDocument();
    expect(offersCards.length).toBe(2);
  });
}));
