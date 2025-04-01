import { RequestStatus } from '../../const';
import { offersSlice, offersActions } from './offers';
import { CITIES } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';

const { changeCity, changeFavoriteStatusInMainOffer, fetchOffers } = offersActions;

describe('Offers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentCity: '',
      items: [],
      status: RequestStatus.Succeeded,
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentCity: CITIES[0],
      items: [],
      status: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update currentCity when changeCity action is dispatched', () => {
    const mockCity = 'Ufa';
    const expectedState = {
      currentCity: mockCity,
      items: [],
      status: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(undefined, changeCity(mockCity));

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

    const result = offersSlice.reducer(initialState, changeFavoriteStatusInMainOffer(mockOffer.id));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when fetchOffers is pending', () => {
    const expectedState = {
      currentCity: CITIES[0],
      items: [],
      status: RequestStatus.Loading,
    };

    const result = offersSlice.reducer(undefined, fetchOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched offers and mark status as "succeeded" when fetchOffers is fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      currentCity: CITIES[0],
      items: [mockOffer],
      status: RequestStatus.Succeeded,
    };

    const result = offersSlice.reducer(undefined, fetchOffers.fulfilled(
      [mockOffer], '', undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when fetchOffers is rejected', () => {
    const expectedState = {
      currentCity: CITIES[0],
      items: [],
      status: RequestStatus.Failed,
    };

    const result = offersSlice.reducer(undefined, fetchOffers.rejected);

    expect(result).toEqual(expectedState);
  });
});
