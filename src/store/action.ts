import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/common';
import { AuthorizationStatus } from '../const';

const changeCity = createAction<string>('changeCity');
const loadOffers = createAction<OfferType[]>('loadOffers');
const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
const setError = createAction<string | null>('setError');
const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');

export { changeCity, loadOffers, requireAuthorization, setError, setOffersLoadingStatus };
