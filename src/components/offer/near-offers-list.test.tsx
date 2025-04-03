import { render, screen } from '@testing-library/react';
import NearOffersList from './near-offers-list';

describe('Component: NearOffersList', (() => {
  it('should render correctly', () => {
    const nearOffersContainerTestId = 'near-offers-container';

    render(<NearOffersList nearOffers={[]} />);

    expect(screen.getByTestId(nearOffersContainerTestId)).toBeInTheDocument();
  });
}));
