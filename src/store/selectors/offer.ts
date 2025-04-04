import { RootState } from '../../types/state';
import { NEAR_OFFERS_AMOUNT } from '../../const/const';
import { createSelector } from '@reduxjs/toolkit';
import { getOffers } from './offers';

const getDetailedOffer = (state: Pick<RootState, 'offer'>) => state.offer.item;
const selectNearbyOffers = (state: RootState) => state.nearbyOffers.items;
const getNearbyOffers = createSelector(
  [selectNearbyOffers],
  (nearbyOffers) => nearbyOffers.slice(0, NEAR_OFFERS_AMOUNT)
);

const getCurrentOffer = createSelector(
  [getDetailedOffer, getOffers],
  (detailedOffer, offers) => offers.find((offer) => detailedOffer?.id === offer.id) ?? null
);

const getSortedReviews = createSelector(
  [(state: Pick<RootState, 'reviews'>) => state.reviews.items],
  (reviews) => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

const getNearbyOffersForMap = createSelector(
  [getNearbyOffers, getCurrentOffer],
  (nearbyOffers, currentOffer) => [
    currentOffer,
    ...nearbyOffers
      .filter((offer) => offer.id !== currentOffer?.id)]
);

export { getDetailedOffer, getNearbyOffers, getSortedReviews, getNearbyOffersForMap, getCurrentOffer };
