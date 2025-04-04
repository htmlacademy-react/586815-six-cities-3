import { CITIES } from '../../const/const';
import { OfferType } from '../../types/common';
import { makeFakeDetailedOffer, makeFakeOffer, makeFakeReviewForSort } from '../../utils/mocks';
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


	const state = {
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

	it('should return sorted by date reviews from state', () => {
		const expectedSortedReviews = [mockReviews[2], mockReviews[0], mockReviews[1]];

		const result = getSortedReviews(state);

		expect(result).toEqual(expectedSortedReviews);
	});

	it('should return only current offer when there are no nearby offers', () => {
		const emptyState = { ...state, nearbyOffers: { items: [] } };
		const result = getNearbyOffersForMap(emptyState);
		expect(result).toEqual([mockCurrentOffer]);
	});

	it('should return empty array when there are no reviews', () => {
		const emptyState = { ...state, reviews: { items: [] } };
		const result = getSortedReviews(emptyState);
		expect(result).toEqual([]);
	});

	it('should return current offer if it exists in offers', () => {
		const result = getCurrentOffer(state);
		expect(result).toEqual(mockCurrentOffer);
	});
});
