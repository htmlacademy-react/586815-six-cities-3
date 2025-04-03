import { AppRoute, AuthStatus } from '../const';
import { withHistory, withStore } from '../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { makeFakeStore, makeFakeUserData } from '../utils/mocks';

describe('Component: PrivateRoute', () => {
  let mockHistory: string[];

  beforeAll(() => {
    mockHistory = [];
  });

  it('should navigate to "Login Page" from "Favorite Page", when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute >
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));
    mockHistory.push(AppRoute.Favorites);


    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should navigate to "Main Page" from "Login Page", when user authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <PrivateRoute reverse>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));
    mockHistory.push(AppRoute.Login);


    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
