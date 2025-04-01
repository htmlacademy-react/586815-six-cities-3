import { getOffers, getCurrentCity, getCurrentCityLocation, getFilteredOffers } from './offers';
import { makeFakeOffer } from '../../utils/mocks';

describe('Offers selectors', () => {
  const mockLocation = {
    latitude: 123,
    longitude: 123,
    zoom: 123,
  };
  const mockOffer1 = { ...makeFakeOffer(), city: { name: 'Paris', location: mockLocation } };
  const mockOffer2 = { ...makeFakeOffer(), city: { name: 'Cologne', location: mockLocation } };
  const state = {
    offers: {
      currentCity: 'Paris',
      items: [mockOffer1, mockOffer2]
    }
  };

  it('should return empty array when there are no offers', () => {
    const emptyState = { ...state, offers: { currentCity: '', items: [] } };
    const result = getOffers(emptyState);
    expect(result).toEqual([]);
  });

  it('should return offers from state', () => {
    const expectedOffers = [mockOffer1, mockOffer2];
    const result = getOffers(state);
    expect(result).toEqual(expectedOffers);
  });

  it('should return current city from state', () => {
    const expectedCity = 'Paris';
    const result = getCurrentCity(state);
    expect(result).toBe(expectedCity);
  });

  it('should return location city from state', () => {
    const expectedLocation = mockLocation;
    const result = getCurrentCityLocation(state);
    expect(result).toEqual(expectedLocation);
  });

  it('should return filtered offers by city from state', () => {
    const expectedOffers = [mockOffer1];
    const result = getFilteredOffers(state);
    expect(result).toEqual(expectedOffers);
  });
});
