import { render, screen } from '@testing-library/react';
import Login from './login';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AppRoute, AuthStatus } from '../../const/const';

describe('Component: Login page', (() => {
  it('should render correctly', () => {
    const loginContainerTestId = 'login-page-container';
    const withHistoryComponent = withHistory(<Login />, [AppRoute.Login]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId(loginContainerTestId)).toBeInTheDocument();
  });
}));
