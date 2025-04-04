import { SortingOptions } from '../const/const';
import { OfferType } from '../types/common';

const getSortedOffers = (offers: OfferType[], sortType: string): OfferType[] => {
  switch (sortType) {
    case SortingOptions.PriceLowToHigh:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortingOptions.PriceHighToLow:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortingOptions.TopRatedFirst:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export { getSortedOffers };
