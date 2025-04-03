import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore, makeFakeUserData } from '../../../utils/mocks';
import { AppRoute, AuthStatus } from '../../../const';


describe('Component: ReviewForm', (() => {
  it('should render correctly', () => {
    const reviewFormContainerTestId = 'review-form-container';
    const withHistoryComponent = withHistory(<ReviewForm />, [AppRoute.Offer]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId(reviewFormContainerTestId)).toBeInTheDocument();
  });
}));
