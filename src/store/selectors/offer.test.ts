import { CITIES, RequestStatus } from '../../const';
import { OfferType } from '../../types/common';
import { makeFakeDetailedOffer, makeFakeOffer, makeFakeReviewForSort } from '../../utils/mocks';
import { getDetailedOffer, getNearbyOffers, getNearbyOffersForMap, getSortedReviews, getCurrentOffer } from './offer';
import { NEAR_OFFERS_AMOUNT } from '../../const';

describe('Offer selectors', () => {
  const mockDetailedOffer = makeFakeDetailedOffer();
  const mockCurrentOffer = {
    ...mockDetailedOffer,
    previewImage: 'url'
  } as OfferType;
  const mockOffer = makeFakeOffer();
  const mockDates = ['2019-05-08T14:13:56.569Z', '2020-05-08T14:13:56.569Z', '2021-05-08T14:13:56.569Z'];
  const mockReviews = [makeFakeReviewForSort(mockDates[1]), makeFakeReviewForSort(mockDates[0]), makeFakeReviewForSort(mockDates[2])];


  const state = {
    offer: {
      item: mockDetailedOffer,
      status: RequestStatus.Succeeded,
    },
    nearbyOffers: {
      items: [mockOffer],
      status: RequestStatus.Succeeded,
    },
    offers: {
      currentCity: CITIES[0],
      items: [mockOffer, mockCurrentOffer],
      status: RequestStatus.Succeeded,
    },
    reviews: {
      items: mockReviews,
      status: RequestStatus.Succeeded,
    }
  };

  it('should return detailed offer from state', () => {
    const expectedDetailedOffer = state.offer.item;

    const result = getDetailedOffer(state);

    expect(result).toEqual(expectedDetailedOffer);
  });

  it('should return nearby offers from state', () => {
    const expectedNearbyOffers = state.nearbyOffers.items;

    const result = getNearbyOffers(state);

    expect(result).toEqual(expectedNearbyOffers);
  });

  it('should return current offer and nearby offers from state', () => {
    const currentOffer = state.offers.items.find((offer) => offer.id === state.offer.item.id);
    const expectedOffers = [
      currentOffer,
      ...state.nearbyOffers.items.filter((offer) => offer.id !== currentOffer?.id)
    ].slice(0, NEAR_OFFERS_AMOUNT);

    const result = getNearbyOffersForMap(state);

    expect(result).toEqual(expectedOffers);
  });

  it('should return sorted reviews from state', () => {
    const expectedReviews = [mockReviews[2], mockReviews[0], mockReviews[1]];

    const result = getSortedReviews(state);

    expect(result).toEqual(expectedReviews);
  });

  it('should return only current offer when there are no nearby offers', () => {
    const emptyState = { ...state, nearbyOffers: { items: [], status: RequestStatus.Succeeded } };
    const result = getNearbyOffersForMap(emptyState);
    expect(result).toEqual([mockCurrentOffer]);
  });

  it('should return empty array when there are no reviews', () => {
    const emptyState = { ...state, reviews: { items: [], status: RequestStatus.Succeeded } };
    const result = getSortedReviews(emptyState);
    expect(result).toEqual([]);
  });

  it('should return current offer if it exists in offers', () => {
    const result = getCurrentOffer(state);
    expect(result).toEqual(mockCurrentOffer);
  });
});
