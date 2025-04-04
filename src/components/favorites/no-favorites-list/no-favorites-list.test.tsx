import { render, screen } from '@testing-library/react';
import NoFavoritesList from './no-favorites-list';

describe('Component: NoFavoritesList', (() => {
  it('should render correctly', () => {
    const noFavoritesListContainerTestId = 'no-favorites-list-container';

    render(<NoFavoritesList />);

    expect(screen.getByTestId(noFavoritesListContainerTestId)).toBeInTheDocument();
  });
}));
