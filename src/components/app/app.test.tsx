import { render, screen } from '@testing-library/react';
import { AppRoute, AuthStatus } from '../../const/const';
import App from './app';
import { makeFakeStore, makeFakeUserData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Application Routing', () => {
  let mockHistory: string[];

  beforeEach(() => {
    mockHistory = [];
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const mainPageContainerTestId = 'main-page-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageContainerTestId)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorite" and when Auth', () => {
    const favoritesPageContainerTestId = 'favorites-page-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId(favoritesPageContainerTestId)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login" and when NoAuth', () => {
    const loginPageContainerTestId = 'login-page-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(loginPageContainerTestId)).toBeInTheDocument();
  });

  it('should render "MainPage" when user navigate to "/login" and when Auth', () => {
    const mainPageContainerTestId = 'main-page-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageContainerTestId)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/favorite" and when NoAuth', () => {
    const loginPageContainerTestId = 'login-page-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(loginPageContainerTestId)).toBeInTheDocument();
  });
});
