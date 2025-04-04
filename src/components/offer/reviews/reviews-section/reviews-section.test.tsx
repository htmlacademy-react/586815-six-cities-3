import { render, screen } from '@testing-library/react';
import ReviewsSection from './reviews-section';
import { withHistory, withStore } from '../../../../utils/mock-component';
import { AppRoute } from '../../../../const/const';
import { makeFakeStore } from '../../../../utils/mocks';

describe('Component: ReviewsSection', (() => {
  it('should render correctly', () => {
    const reviewsSectionContainerTestId = 'reviews-section-container';
    const withHistoryComponent = withHistory(<ReviewsSection />, [AppRoute.Offer]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(reviewsSectionContainerTestId)).toBeInTheDocument();
  });
}));
