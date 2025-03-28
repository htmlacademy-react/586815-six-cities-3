import { RequestStatus } from '../../const';
import { reviewsSlice, reviewsActions } from './reviews';
import { makeFakeReview, makeFakeReviewContent } from '../../utils/mocks';

const { fetchOfferReviews, sendReviewAction } = reviewsActions;

describe('Reviews Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Succeeded,
    };

    const result = reviewsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Idle,
    };

    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when fetchOfferReviews is pending', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Loading,
    };

    const result = reviewsSlice.reducer(undefined, fetchOfferReviews.pending);

    expect(result).toEqual(expectedState);
  });

  it('should store fetched reviews and mark status as "succeeded" when fetchOfferReviews is fulfilled', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      items: [mockReview],
      status: RequestStatus.Succeeded,
    };

    const result = reviewsSlice.reducer(undefined, fetchOfferReviews.fulfilled(
      [mockReview], '', {}, undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when fetchOfferReviews is rejected', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Failed,
    };

    const result = reviewsSlice.reducer(undefined, fetchOfferReviews.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when sendReviewAction is pending', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Loading,
    };

    const result = reviewsSlice.reducer(undefined, sendReviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "succeeded" when sendReviewAction is fulfilled', () => {
    const mockReviewContent = makeFakeReviewContent();
    const expectedState = {
      items: [],
      status: RequestStatus.Succeeded,
    };

    const result = reviewsSlice.reducer(undefined, sendReviewAction.fulfilled(undefined, '', { body: mockReviewContent, offerId: '' }));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when sendReviewAction is rejected', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Failed,
    };

    const result = reviewsSlice.reducer(undefined, sendReviewAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
