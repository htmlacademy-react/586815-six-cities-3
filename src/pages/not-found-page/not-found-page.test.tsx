import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AuthStatus } from '../../const/const';

describe('Component: NotFoundPage page', (() => {
  it('should render correctly', () => {
    const notFoundPageContainerTestId = 'not-found-page-container';
    const withHistoryComponent = withHistory(<NotFoundPage />, ['notFoundRoute']);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: { authStatus: AuthStatus.NoAuth, info: null }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId(notFoundPageContainerTestId)).toBeInTheDocument();
  });
}));
