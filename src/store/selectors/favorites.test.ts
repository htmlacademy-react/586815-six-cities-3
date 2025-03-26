import { RequestStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getFavoritesOffers, getFavoritesCount, getFavoritesCities } from './favorites';

describe('Favorites selectors', () => {
  const mockOffer = makeFakeOffer();
  const state = {
    favorites: {
      items: [mockOffer],
      status: RequestStatus.Succeeded
    }
  };

  it('should return offers from state', () => {
    const expectedOffers = state.favorites.items;

    const result = getFavoritesOffers(state);

    expect(result).toEqual(expectedOffers);
  });

  it('should return offers.length from state', () => {
    const { items } = state.favorites;
    const expectedCount = items.length;

    const result = getFavoritesCount(state);

    expect(result).toBe(expectedCount);
  });

  it('should return cities from state', () => {
    const { items } = state.favorites;
    const expectedCities = [... new Set(items.map((offer) => offer.city.name))];

    const result = getFavoritesCities(state);

    expect(result).toEqual(expectedCities);
  });
});
