import { favoritesSlice, favoriteActions } from './favorites';
import { makeFakeOffer } from '../../utils/mocks';

const { fetchFavoritesOffers } = favoriteActions;

describe('Favorites Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: []
    };

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: []
    };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched offers when fetchFavoritesOffers is fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      items: [mockOffer],
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesOffers.fulfilled(
      [mockOffer], '', undefined
    ));

    expect(result).toEqual(expectedState);
  });
});
