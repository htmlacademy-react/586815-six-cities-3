import { RequestStatus } from '../../const';
import { getOffers, getCurrentCity, getCurrentCityLocation, getFilteredOffers, selectOffersLoading } from './offers';
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
      items: [mockOffer1, mockOffer2],
      status: RequestStatus.Succeeded,
    }
  };

  it('should return empty array when there are no offers', () => {
    const emptyState = { ...state, offers: { currentCity: '', items: [], status: RequestStatus.Succeeded } };
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

  it('should return false when status from state is not "Loading"', () => {
    const result = selectOffersLoading(state);
    expect(result).toBeFalsy();
  });

  it('should return true when status from state is "Loading"', () => {
    const initialState = { ...state, offers: { ...state.offers, status: RequestStatus.Loading } };
    const result = selectOffersLoading(initialState);
    expect(result).toBeTruthy();
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
