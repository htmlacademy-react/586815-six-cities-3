import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeFakeReview } from '../../../utils/mocks';


describe('Component: ReviewsList', (() => {
  it('should render correctly', () => {
    const reviewsListContainerTestId = 'reviews-list-container';

    render(<ReviewsList reviews={[makeFakeReview(), makeFakeReview()]} />);

    expect(screen.getByTestId(reviewsListContainerTestId)).toBeInTheDocument();
  });
}));
