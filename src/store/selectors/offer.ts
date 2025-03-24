import { RootState } from '../../types/state';
import { NEAR_OFFERS_AMOUNT } from '../../const';
import { createSelector } from '@reduxjs/toolkit';
import { OfferType } from '../../types/common';

const selectDetailedOffer = (state: RootState) => state.offer.item;
const selectNearbyOffers = (state: RootState) => state.nearbyOffers.items;
const selectCurrentOffer = (_: RootState, currentOffer: OfferType) => currentOffer;

const selectSortedReviews = createSelector(
  [(state: RootState) => state.reviews.items],
  (reviews) => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

const selectNearbyOffersForMap = createSelector(
  [selectNearbyOffers, selectCurrentOffer],
  (nearbyOffers, currentOffer) => [
    currentOffer,
    ...nearbyOffers
      .filter((offer) => offer.id !== currentOffer.id)
      .slice(0, NEAR_OFFERS_AMOUNT)]
);

export { selectDetailedOffer, selectNearbyOffers, selectSortedReviews, selectNearbyOffersForMap };
