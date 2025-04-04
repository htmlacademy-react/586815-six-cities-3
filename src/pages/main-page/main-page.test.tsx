import { render, screen } from '@testing-library/react';
import MainPage from './main-page';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AppRoute, AuthStatus } from '../../const/const';

describe('Component: MainPage page', (() => {
  it('should render correctly', () => {
    const mainPageContainerTestId = 'main-page-container';
    const withHistoryComponent = withHistory(<MainPage />, [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageContainerTestId)).toBeInTheDocument();
  });
}));
