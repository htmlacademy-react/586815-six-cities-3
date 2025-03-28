import { nearbyOfferSlice, nearbyOffersActions } from './nearby-offers';
import { RequestStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';

const { fetchNearbyOffers, changeFavoriteStatusInNearbyOffer } = nearbyOffersActions;

describe('NearbyOffers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Succeeded,
    };

    const result = nearbyOfferSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Idle,
    };

    const result = nearbyOfferSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when fetchNearbyOffers is pending', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Loading,
    };

    const result = nearbyOfferSlice.reducer(undefined, fetchNearbyOffers.pending);

    expect(result).toEqual(expectedState);
  });


  it('should store fetched offers and mark status as "succeeded" when fetchNearbyOffers is fulfilled', () => {
    const mockNearbyOffer = makeFakeOffer();
    const expectedState = {
      items: [mockNearbyOffer],
      status: RequestStatus.Succeeded,
    };

    const result = nearbyOfferSlice.reducer(undefined, fetchNearbyOffers.fulfilled(
      [mockNearbyOffer], '', {}, undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when fetchNearbyOffers is rejected', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Failed,
    };

    const result = nearbyOfferSlice.reducer(undefined, fetchNearbyOffers.rejected);

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
      items: [mockOffer],
      status: RequestStatus.Idle,
    };
    const expectedState = {
      currentCity: '',
      items: [expectedOffer],
      status: RequestStatus.Idle,
    };

    const result = nearbyOfferSlice.reducer(initialState, changeFavoriteStatusInNearbyOffer(mockOffer.id));

    expect(result).toEqual(expectedState);
  });
});
