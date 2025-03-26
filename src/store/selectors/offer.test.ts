import { CITIES, RequestStatus } from '../../const';
import { OfferType } from '../../types/common';
import { makeFakeDetailedOffer, makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import { getDetailedOffer, getNearbyOffers, getNearbyOffersForMap, getSortedReviews } from './offer';

describe('Offer selectors', () => {
  const mockDetailedOffer = makeFakeDetailedOffer();
  const mockCurrentOffer = {
    ...mockDetailedOffer,
    previewImage: 'url'
  } as OfferType;
  const mockOffer = makeFakeOffer();
  const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];

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
    const expectedOffers = [
      state.offers.items.find((offer) => offer.id === state.offer.item.id),
      ...state.nearbyOffers.items
    ];

    const result = getNearbyOffersForMap(state);

    expect(result).toEqual(expectedOffers);
  });

  it('should return sorted reviews from state', () => {
    const expectedReviews = state.reviews.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const result = getSortedReviews(state);

    expect(result).toEqual(expectedReviews);
  });
});
