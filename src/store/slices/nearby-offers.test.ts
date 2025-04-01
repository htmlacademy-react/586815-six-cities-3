import { nearbyOfferSlice, nearbyOffersActions } from './nearby-offers';
import { makeFakeOffer } from '../../utils/mocks';

const { fetchNearbyOffers, changeFavoriteStatusInNearbyOffer } = nearbyOffersActions;

describe('NearbyOffers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: []
    };

    const result = nearbyOfferSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: []
    };

    const result = nearbyOfferSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched offers when fetchNearbyOffers is fulfilled', () => {
    const mockNearbyOffer = makeFakeOffer();
    const expectedState = {
      items: [mockNearbyOffer]
    };

    const result = nearbyOfferSlice.reducer(undefined, fetchNearbyOffers.fulfilled(
      [mockNearbyOffer], '', {}, undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should toggle isFavorite in offer when changeFavoriteStatus is dispatched', () => {
    const mockOffer = makeFakeOffer();
    const expectedOffer = {
      ...mockOffer,
      isFavorite: !mockOffer.isFavorite,
    };
    const initialState = {
      currentCity: '',
      items: [mockOffer]
    };
    const expectedState = {
      currentCity: '',
      items: [expectedOffer]
    };

    const result = nearbyOfferSlice.reducer(initialState, changeFavoriteStatusInNearbyOffer(mockOffer.id));

    expect(result).toEqual(expectedState);
  });
});
