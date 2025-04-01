import { render, screen } from '@testing-library/react';
import Sorting from './sorting';

describe('Component: Sorting', (() => {
  it('should render correctly', () => {
    const sortingContainerTestId = 'sorting-container';

    render(<Sorting onSortOptionChange={() => { }} />);

    expect(screen.getByTestId(sortingContainerTestId)).toBeInTheDocument();
  });
}));
