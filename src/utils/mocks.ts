import { name, image, date, address, internet, datatype, commerce } from 'faker';
import { OfferType, DetailedOfferType, ReviewType, ReviewContentType } from '../types/common';
import { UserData } from '../types/user';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const axios = createAPI();

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

const getMockStoreCreator = () => {
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  return mockStoreCreator;
};

const getAxiosAdapter = () => {
  const mockAxiosAdapter = new MockAdapter(axios);
  return mockAxiosAdapter;
};

const makeFakeOffer = (): OfferType => ({
  id: datatype.uuid(),
  title: name.title(),
  type: name.jobType(),
  price: Number(commerce.price()),
  city: {
    name: name.title(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: Math.floor(Math.random() * 10),
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: Math.floor(Math.random() * 10),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: Math.floor(Math.random() * 5),
  previewImage: image.dataUri(),
});

const makeFakeDetailedOffer = (): DetailedOfferType => ({
  id: datatype.uuid(),
  title: name.title(),
  type: name.jobType(),
  price: Number(commerce.price()),
  city: {
    name: name.title(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: name.title(),
  bedrooms: datatype.number(),
  goods: [name.title()],
  host: {
    name: name.title(),
    avatarUrl: image.dataUri(),
    isPro: datatype.boolean(),
  },
  images: [image.dataUri()],
  maxAdults: datatype.number(),
});

const makeFakeReview = (): ReviewType => ({
  id: datatype.uuid(),
  date: date.past().toString(),
  user: {
    name: name.title(),
    avatarUrl: image.dataUri(),
    isPro: datatype.boolean(),
  },
  comment: name.title(),
  rating: datatype.number(),
});

const makeFakeReviewForSort = (dateReview: string): ReviewType => ({
  ...makeFakeReview(),
  date: dateReview,
});

const makeFakeReviewContent = (): ReviewContentType => ({
  comment: name.title(),
  rating: datatype.number(),
});

const makeFakeUserData = (): UserData => ({
  avatarUrl: image.dataUri(),
  email: internet.email(),
  isPro: datatype.boolean(),
  name: name.title(),
  token: datatype.uuid(),
});

export { makeFakeOffer, makeFakeDetailedOffer, makeFakeReview, makeFakeReviewContent, makeFakeUserData, makeFakeReviewForSort, getMockStoreCreator, getAxiosAdapter, extractActionsTypes };
