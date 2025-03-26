import { RequestStatus } from '../../const';
import { offerSlice, offerActions } from './offer';
import { makeFakeDetailedOffer } from '../../utils/mocks';

const { fetchDetailedOffer } = offerActions;

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      item: null,
      status: RequestStatus.Succeeded,
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      item: null,
      status: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when fetchDetailedOffer is pending', () => {
    const expectedState = {
      item: null,
      status: RequestStatus.Loading,
    };

    const result = offerSlice.reducer(undefined, fetchDetailedOffer.pending);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched offer and mark status as "succeeded" when fetchDetailedOffer is fulfilled', () => {
    const mockOffer = makeFakeDetailedOffer();
    const expectedState = {
      item: mockOffer,
      status: RequestStatus.Succeeded,
    };

    const result = offerSlice.reducer(undefined, fetchDetailedOffer.fulfilled(
      mockOffer, '', {}, undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when fetchDetailedOffer is rejected', () => {
    const expectedState = {
      item: null,
      status: RequestStatus.Failed,
    };

    const result = offerSlice.reducer(undefined, fetchDetailedOffer.rejected);

    expect(result).toEqual(expectedState);
  });

});
