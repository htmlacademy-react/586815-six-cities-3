import { render, screen } from '@testing-library/react';
import Features from './features';


describe('Component: Features', (() => {
  it('should render correctly', () => {
    const featuresContainerTestId = 'features-container';

    render(<Features features={['Wi-fi']} />);

    expect(screen.getByTestId(featuresContainerTestId)).toBeInTheDocument();
  });
}));
