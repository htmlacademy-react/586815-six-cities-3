import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

const getFavoritesOffers = (state: RootState) => state.favorites.items;

const getFavoritesCount = createSelector(
  [getFavoritesOffers],
  (favorites) => favorites.length
);

const getFavoritesCities = createSelector(
  [getFavoritesOffers],
  (favorites) => [...new Set(favorites.map((offer) => offer.city.name))]
);

export { getFavoritesOffers, getFavoritesCount, getFavoritesCities };
