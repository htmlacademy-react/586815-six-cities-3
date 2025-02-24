import { OfferType } from '../types/common';
import { AuthorizationStatus } from '../const';

const placeCards: OfferType[] = [
  {
    id: '1',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }
  },
  {
    id: '2',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 4,
    title: 'Wood and stone place',
    type: 'Room',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }
  },
  {
    id: '3',
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    }
  },
  {
    id: '4',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    }
  },
  {
    id: '5',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 4.3,
    title: 'Wood and stone place',
    type: 'Room',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  }
];

const getAuthorizationStatus = () => AuthorizationStatus.Auth;

export { placeCards, getAuthorizationStatus };
