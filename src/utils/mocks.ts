import { name, image } from 'faker';
import { OfferType } from '../types/common';

const makeFakeOffer = (): OfferType => ({
  id: Math.random().toString(),
  title: name.title(),
  type: name.jobType(),
  price: Math.floor(Math.random() * 1000),
  city: {
    name: name.title(),
    location: {
      latitude: Math.random() * 100,
      longitude: Math.random() * 100,
      zoom: Math.floor(Math.random() * 10),
    },
  },
  location: {
    latitude: Math.random() * 100,
    longitude: Math.random() * 100,
    zoom: Math.floor(Math.random() * 10),
  },
  isFavorite: Math.random() > 0.5,
  isPremium: Math.random() > 0.5,
  rating: Math.floor(Math.random() * 5),
  previewImage: image.dataUri(),
});

export { makeFakeOffer };
