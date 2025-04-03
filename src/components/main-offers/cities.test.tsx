import { render, screen } from '@testing-library/react';
import Cities from './cities';
import { CITIES } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: Cities', (() => {
  it('should render correctly', () => {
    const citiesContainerTestId = 'cities-container';
    render(<Cities currentCity={CITIES[0]} onCityClick={() => { }} />);
    expect(screen.getByTestId(citiesContainerTestId)).toBeInTheDocument();
  });

  it('should call onCityClick handler once when a city is clicked', async () => {
    const onCityClick = vi.fn();
    render(<Cities currentCity={CITIES[0]} onCityClick={onCityClick} />);
    const cityLink = screen.getByText('Paris').closest('a');

    if (!cityLink) {
      throw new Error('City link not found');
    }

    await userEvent.click(cityLink);

    expect(onCityClick).toHaveBeenCalledTimes(1);
  });
}));
