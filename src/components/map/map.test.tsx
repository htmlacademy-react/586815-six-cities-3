import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeFakeOffer } from '../../utils/mocks';

describe('Component: Map', (() => {
  it('should render correctly', () => {
    const mapContainerTestId = 'map-container';
    const mockOffer = makeFakeOffer();

    render(<Map currentCity={mockOffer.city.location} offers={[mockOffer]} selectedOfferId={mockOffer.id} />);

    expect(screen.getByTestId(mapContainerTestId)).toBeInTheDocument();
  });
}));
