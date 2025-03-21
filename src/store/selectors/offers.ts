import { RootState } from '../../types/state';
import { RequestStatus } from '../../const';
import { createSelector } from '@reduxjs/toolkit';

const getOffers = (state: RootState) => state.offers.items;
const getCurrentCity = (state: RootState) => state.offers.currentCity;
const isOffersLoading = (state: RootState) => state.offers.status === RequestStatus.Loading;

const getCurrentCityLocation = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.find((offer) => offer.city.name === city)?.city.location
);

const getFilteredOffers = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export { getOffers, isOffersLoading, getCurrentCity, getCurrentCityLocation, getFilteredOffers };
