import { render, screen } from '@testing-library/react';
import ReviewsItem from './reviews-item';
import { makeFakeReview } from '../../../../utils/mocks';


describe('Component: ReviewsItem', (() => {
  it('should render correctly', () => {
    const reviewsItemContainerTestId = 'reviews-item-container';

    render(<ReviewsItem review={makeFakeReview()} />);

    expect(screen.getByTestId(reviewsItemContainerTestId)).toBeInTheDocument();
  });
}));
