import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import NoOffersList from './no-offers-list';

describe('Component: NoOffersList', (() => {
  it('should render correctly', () => {
    const noOffersListContainerTestId = 'no-offers-list-container';
    const expectedText = `We could not find any property available at the moment in ${CITIES[0]}`;


    render(<NoOffersList currentCity={CITIES[0]} />);

    expect(screen.getByTestId(noOffersListContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
}));
