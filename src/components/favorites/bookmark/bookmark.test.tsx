import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Bookmark from './bookmark';
import { withHistory, withStore } from '../../../utils/mock-component';
import { AuthStatus, TypeBookmark } from '../../../const/const';
import { Route, Routes } from 'react-router-dom';
import { makeFakeStore, makeFakeUserData } from '../../../utils/mocks';
import { AppRoute } from '../../../const/const';

describe('Component: Bookmark', (() => {
  it('should render with text "To bookmarks" when offer is not in favorites and Auth', (() => {
    const expectedText = 'To bookmarks';
    const withHistoryComponent = withHistory(
      <Bookmark
        onFavoritesChange={() => { }}
        type={TypeBookmark.PlaceCard}
        isFavorite={false}
      />, [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));

    render(withStoreComponent);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  }));

  it('should render with text "In bookmarks" when offer is in favorites and user state is Auth', (() => {
    const expectedText = 'In bookmarks';
    const withHistoryComponent = withHistory(
      <Bookmark
        onFavoritesChange={() => { }}
        type={TypeBookmark.PlaceCard}
        isFavorite
      />, [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));

    render(withStoreComponent);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  }));

  it('should use "onFavoritesChange" and render disabled button after click when user state is Auth', (async () => {
    const mockFavoritesChange = vi.fn();
    const withHistoryComponent = withHistory(
      <Bookmark
        onFavoritesChange={mockFavoritesChange}
        type={TypeBookmark.PlaceCard}
        isFavorite
      />, [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.Auth, info: makeFakeUserData() }
    }));

    render(withStoreComponent);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(mockFavoritesChange).toHaveBeenCalledTimes(1);
  }));

  it('should navigate to login-page after click when user state is NoAuth', (async () => {
    const loginPageContainerTestId = 'login-page-container';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={
          <Bookmark
            onFavoritesChange={() => { }}
            type={TypeBookmark.PlaceCard}
            isFavorite={false}
          />
        }
        />
        <Route path={AppRoute.Login} element={<div data-testid={loginPageContainerTestId} />} />
      </Routes>
      , [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));

    render(withStoreComponent);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId(loginPageContainerTestId)).toBeInTheDocument();
    });
  }));
}));
