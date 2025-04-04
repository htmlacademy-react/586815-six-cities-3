import { render, screen } from '@testing-library/react';
import UserProfile from './user-profile';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore, makeFakeUserData } from '../../../utils/mocks';
import { AppRoute, AuthStatus } from '../../../const/const';

describe('Component: UserProfile', (() => {
  let mockHistory: string[];

  beforeEach(() => {
    mockHistory = [];
  });

  it('should render correctly when user state is Auth', () => {
    const profileContainerTestId = 'profile-container';
    const logoutButtonContainerTestId = 'logout-button-container';
    const withHistoryComponent = withHistory(<UserProfile />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(profileContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(logoutButtonContainerTestId)).toBeInTheDocument();
  });

  it('should render correctly when user state is NoAuth', () => {
    const loginButtonContainerTestId = 'login-button-container';
    const withHistoryComponent = withHistory(<UserProfile />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(loginButtonContainerTestId)).toBeInTheDocument();
  });
}));
