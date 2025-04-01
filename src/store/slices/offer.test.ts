import { offerSlice, offerActions } from './offer';
import { makeFakeDetailedOffer } from '../../utils/mocks';

const { fetchDetailedOffer } = offerActions;

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      item: null
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      item: null
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched offer when fetchDetailedOffer is fulfilled', () => {
    const mockOffer = makeFakeDetailedOffer();
    const expectedState = {
      item: mockOffer,
    };

    const result = offerSlice.reducer(undefined, fetchDetailedOffer.fulfilled(
      mockOffer, '', {}, undefined
    ));

    expect(result).toEqual(expectedState);
  });
});
