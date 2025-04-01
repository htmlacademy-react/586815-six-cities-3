import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

const getOffers = (state: Pick<RootState, 'offers'>) => state.offers.items;
const getCurrentCity = (state: Pick<RootState, 'offers'>) => state.offers.currentCity;

const getCurrentCityLocation = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.find((offer) => offer.city.name === city)?.city.location
);

const getFilteredOffers = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export { getOffers, getCurrentCity, getCurrentCityLocation, getFilteredOffers };
