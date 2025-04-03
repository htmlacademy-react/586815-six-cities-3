import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const loaderContainerTestId = 'loader-container';

    render(<Loader />);
    const loaderContainer = screen.getByTestId(loaderContainerTestId);

    expect(loaderContainer).toBeInTheDocument();
  });
});
