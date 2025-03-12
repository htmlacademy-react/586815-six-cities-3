import { createAction } from '@reduxjs/toolkit';
import { OfferType, DetailedOfferType, ReviewType } from '../types/common';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user';

const changeCity = createAction<string>('changeCity');
const loadOffers = createAction<OfferType[]>('loadOffers');
const loadDetailedOffer = createAction<DetailedOfferType | null>('loadDetailedOffer');
const loadOfferReviews = createAction<ReviewType[]>('loadOfferReviews');
const loadNearbyOffers = createAction<OfferType[]>('loadNearbyOffers');
const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
const setError = createAction<string | null>('setError');
const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');
const addUserData = createAction<UserData | null>('addUserData');

export { changeCity, loadOffers, loadDetailedOffer, requireAuthorization, setError, setOffersLoadingStatus, addUserData, loadOfferReviews, loadNearbyOffers };
