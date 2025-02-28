import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/common';

const changeCity = createAction<string>('changeCity');
const initialOffers = createAction<OfferType[]>('initialOffers');

export { changeCity, initialOffers };
