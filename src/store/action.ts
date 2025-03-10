import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/common';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user';

const changeCity = createAction<string>('changeCity');
const loadOffers = createAction<OfferType[]>('loadOffers');
const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
const setError = createAction<string | null>('setError');
const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');
const addUserData = createAction<UserData | null>('addUserData');

export { changeCity, loadOffers, requireAuthorization, setError, setOffersLoadingStatus, addUserData };
