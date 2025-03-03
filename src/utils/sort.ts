import { SortingOptions } from '../const';
import { OfferType } from '../types/common';

const getSortedOffers = (offers: OfferType[], sortType: string): OfferType[] => {
  switch (sortType) {
    case SortingOptions.PRICE_LOW_TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortingOptions.PRICE_HIGH_TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortingOptions.TOP_RATED_FIRST:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export { getSortedOffers };
