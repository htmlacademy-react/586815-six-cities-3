import { nearbyOfferSlice, nearbyOffersActions } from './nearby-offers';
import { RequestStatus } from '../../const';
// import { makeFakeOffer } from '../../utils/mocks';

const { fetchNearbyOffers } = nearbyOffersActions;

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


  // it('should store fetched offers and mark status as "succeeded" when fetchNearbyOffers is fulfilled', () => {
  //   const mockNearbyOffer = makeFakeOffer();
  //   const mockOfferId = 'qwerty123';
  //   const expectedState = {
  //     items: [mockOffer],
  //     status: RequestStatus.Succeeded,
  //   };

  //   const result = nearbyOfferSlice.reducer(undefined, fetchNearbyOffers.fulfilled(
  //     [mockNearbyOffer], '', mockOfferId
  //   ));

  //   expect(result).toEqual(expectedState);
  // });
});
