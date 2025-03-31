import { RootState } from '../../types/state';
import { NEAR_OFFERS_AMOUNT } from '../../const';
import { createSelector } from '@reduxjs/toolkit';
import { getOffers } from './offers';

const getDetailedOffer = (state: Pick<RootState, 'offer'>) => state.offer.item;
const getNearbyOffers = (state: Pick<RootState, 'nearbyOffers'>) => state.nearbyOffers.items.slice(0, NEAR_OFFERS_AMOUNT);

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
