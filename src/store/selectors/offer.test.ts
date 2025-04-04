import { CITIES } from '../../const/const';
import { OfferType } from '../../types/common';
import { makeFakeDetailedOffer, makeFakeOffer, makeFakeReviewForSort, makeFakeStore } from '../../utils/mocks';
import { getDetailedOffer, getNearbyOffers, getNearbyOffersForMap, getSortedReviews, getCurrentOffer } from './offer';
import { NEAR_OFFERS_AMOUNT } from '../../const/const';

describe('Offer selectors', () => {
  const mockDetailedOffer = makeFakeDetailedOffer();
  const mockCurrentOffer = {
    ...mockDetailedOffer,
    previewImage: 'url'
  } as OfferType;
  const mockOffer = makeFakeOffer();
  const mockDates = ['2019-05-08T14:13:56.569Z', '2020-05-08T14:13:56.569Z', '2021-05-08T14:13:56.569Z'];
  const mockReviews = [makeFakeReviewForSort(mockDates[1]), makeFakeReviewForSort(mockDates[0]), makeFakeReviewForSort(mockDates[2])];


  const store = makeFakeStore({
    offer: {
      item: mockDetailedOffer
    },
    nearbyOffers: {
      items: [mockOffer]
    },
    offers: {
      currentCity: CITIES[0],
      items: [mockOffer, mockCurrentOffer]
    },
    reviews: {
      items: mockReviews
    }
  });

  it('should return detailed offer from state', () => {
    const expectedDetailedOffer = store.offer.item;

    const result = getDetailedOffer(store);

    expect(result).toEqual(expectedDetailedOffer);
  });

  it('should return nearby offers from state', () => {
    const expectedNearbyOffers = store.nearbyOffers.items;

    const result = getNearbyOffers(store);

    expect(result).toEqual(expectedNearbyOffers);
  });

  it('should return current offer and nearby offers from state', () => {
    const currentOffer = store.offers.items.find((offer) => offer.id === store.offer.item?.id);
    const expectedOffers = [
      currentOffer,
      ...store.nearbyOffers.items.filter((offer) => offer.id !== currentOffer?.id)
    ].slice(0, NEAR_OFFERS_AMOUNT);

    const result = getNearbyOffersForMap(store);

    expect(result).toEqual(expectedOffers);
  });

  it('should return sorted by date reviews from state', () => {
    const expectedSortedReviews = [mockReviews[2], mockReviews[0], mockReviews[1]];

    const result = getSortedReviews(store);

    expect(result).toEqual(expectedSortedReviews);
  });

  it('should return only current offer when there are no nearby offers', () => {
    const emptyState = { ...store, nearbyOffers: { items: [] } };
    const result = getNearbyOffersForMap(emptyState);
    expect(result).toEqual([mockCurrentOffer]);
  });

  it('should return empty array when there are no reviews', () => {
    const emptyState = { ...store, reviews: { items: [] } };
    const result = getSortedReviews(emptyState);
    expect(result).toEqual([]);
  });

  it('should return current offer if it exists in offers', () => {
    const result = getCurrentOffer(store);
    expect(result).toEqual(mockCurrentOffer);
  });
});
