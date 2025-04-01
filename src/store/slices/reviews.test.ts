import { reviewsSlice, reviewsActions } from './reviews';
import { makeFakeReview } from '../../utils/mocks';

const { fetchOfferReviews } = reviewsActions;

describe('Reviews Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: []
    };

    const result = reviewsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: []
    };

    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched reviews and mark status as "succeeded" when fetchOfferReviews is fulfilled', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      items: [mockReview],
    };

    const result = reviewsSlice.reducer(undefined, fetchOfferReviews.fulfilled(
      [mockReview], '', {}, undefined
    ));

    expect(result).toEqual(expectedState);
  });
});
