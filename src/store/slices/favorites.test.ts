import { RequestStatus } from '../../const';
import { favoritesSlice, favoriteActions } from './favorites';
import { makeFakeOffer } from '../../utils/mocks';

const { fetchFavoritesOffers, changeFavorite } = favoriteActions;

describe('Favorites Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Succeeded,
    };

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Idle,
    };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when fetchFavoritesOffers is pending', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Loading,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched offers and mark status as "succeeded" when fetchFavoritesOffers is fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      items: [mockOffer],
      status: RequestStatus.Succeeded,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesOffers.fulfilled(
      [mockOffer], '', undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when fetchFavoritesOffers is rejected', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Failed,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesOffers.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when changeFavorite is pending', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Loading,
    };

    const result = favoritesSlice.reducer(undefined, changeFavorite.pending);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "succeeded" when changeFavorite is fulfilled', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Succeeded,
    };

    const result = favoritesSlice.reducer(undefined, changeFavorite.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when changeFavorite is rejected', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Failed,
    };

    const result = favoritesSlice.reducer(undefined, changeFavorite.rejected);

    expect(result).toEqual(expectedState);
  });
});
