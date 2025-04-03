import { render, screen } from '@testing-library/react';
import Favorites from './favorites';
import { withHistory, withStore } from '../utils/mock-component';
import { makeFakeStore, makeFakeUserData } from '../utils/mocks';
import { AppRoute, AuthStatus } from '../const';

describe('Component: Favorites page', (() => {
  it('should render correctly', () => {
    const favoritesContainerTestId = 'favorites-page-container';
    const withHistoryComponent = withHistory(<Favorites />, [AppRoute.Offer]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId(favoritesContainerTestId)).toBeInTheDocument();
  });
}));
