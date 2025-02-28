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
  },
  {
    id: '6',
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    price: 200,
    rating: 4.5,
    title: 'Luxurious apartment near Eiffel Tower',
    type: 'Apartment',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 8
      }
    },
    location: {
      latitude: 48.856614,
      longitude: 2.3522219,
      zoom: 8
    }
  },
  {
    id: '7',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 90,
    rating: 4.1,
    title: 'Cozy room in the heart of Paris',
    type: 'Room',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 8
      }
    },
    location: {
      latitude: 48.856614,
      longitude: 2.3522219,
      zoom: 8
    }
  },
  {
    id: '8',
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    price: 150,
    rating: 4.7,
    title: 'Modern apartment with Seine view',
    type: 'Apartment',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 8
      }
    },
    location: {
      latitude: 48.856614,
      longitude: 2.3522219,
      zoom: 8
    }
  },
  {
    id: '9',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    price: 220,
    rating: 4.9,
    title: 'Charming studio in Montmartre',
    type: 'Apartment',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 8
      }
    },
    location: {
      latitude: 48.856614,
      longitude: 2.3522219,
      zoom: 8
    }
  },
  {
    id: '10',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 100,
    rating: 4.2,
    title: 'Bright room with balcony',
    type: 'Room',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 8
      }
    },
    location: {
      latitude: 48.856614,
      longitude: 2.3522219,
      zoom: 8
    }
  },
  {
    id: '11',
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    price: 110,
    rating: 4.3,
    title: 'Spacious apartment near Cathedral',
    type: 'Apartment',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.937531,
        longitude: 6.9602786,
        zoom: 8
      }
    },
    location: {
      latitude: 50.937531,
      longitude: 6.9602786,
      zoom: 8
    }
  },
  {
    id: '12',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 70,
    rating: 4.0,
    title: 'Compact room with city view',
    type: 'Room',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.937531,
        longitude: 6.9602786,
        zoom: 8
      }
    },
    location: {
      latitude: 50.937531,
      longitude: 6.9602786,
      zoom: 8
    }
  },
  {
    id: '13',
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    price: 140,
    rating: 4.6,
    title: 'Modern flat in downtown Cologne',
    type: 'Apartment',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.937531,
        longitude: 6.9602786,
        zoom: 8
      }
    },
    location: {
      latitude: 50.937531,
      longitude: 6.9602786,
      zoom: 8
    }
  },
  {
    id: '14',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    price: 190,
    rating: 4.8,
    title: 'Luxury penthouse with Rhine view',
    type: 'Apartment',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.937531,
        longitude: 6.9602786,
        zoom: 8
      }
    },
    location: {
      latitude: 50.937531,
      longitude: 6.9602786,
      zoom: 8
    }
  },
  {
    id: '15',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 85,
    rating: 4.1,
    title: 'Bright room with balcony',
    type: 'Room',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.937531,
        longitude: 6.9602786,
        zoom: 8
      }
    },
    location: {
      latitude: 50.937531,
      longitude: 6.9602786,
      zoom: 8
    }
  },
  // Brussels
  {
    id: '16',
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    price: 130,
    rating: 4.4,
    title: 'Luxurious apartment near Grand Place',
    type: 'Apartment',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503463,
        longitude: 4.3517215,
        zoom: 8
      }
    },
    location: {
      latitude: 50.8503463,
      longitude: 4.3517215,
      zoom: 8
    }
  },
  {
    id: '17',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 95,
    rating: 4.2,
    title: 'Cozy room in the heart of Brussels',
    type: 'Room',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503463,
        longitude: 4.3517215,
        zoom: 8
      }
    },
    location: {
      latitude: 50.8503463,
      longitude: 4.3517215,
      zoom: 8
    }
  },
  {
    id: '18',
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    price: 160,
    rating: 4.7,
    title: 'Modern apartment with city view',
    type: 'Apartment',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503463,
        longitude: 4.3517215,
        zoom: 8
      }
    },
    location: {
      latitude: 50.8503463,
      longitude: 4.3517215,
      zoom: 8
    }
  },
  {
    id: '19',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    price: 210,
    rating: 4.9,
    title: 'Charming studio near Atomium',
    type: 'Apartment',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503463,
        longitude: 4.3517215,
        zoom: 8
      }
    },
    location: {
      latitude: 50.8503463,
      longitude: 4.3517215,
      zoom: 8
    }
  },
  {
    id: '20',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 105,
    rating: 4.3,
    title: 'Bright room with terrace',
    type: 'Room',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503463,
        longitude: 4.3517215,
        zoom: 8
      }
    },
    location: {
      latitude: 50.8503463,
      longitude: 4.3517215,
      zoom: 8
    }
  },
  {
    id: '26',
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    price: 150,
    rating: 4.6,
    title: 'Luxurious apartment near Königsallee',
    type: 'Apartment',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277411,
        longitude: 6.7734556,
        zoom: 8
      }
    },
    location: {
      latitude: 51.2277411,
      longitude: 6.7734556,
      zoom: 8
    }
  },
  {
    id: '27',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 85,
    rating: 4.1,
    title: 'Compact room with city view',
    type: 'Room',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277411,
        longitude: 6.7734556,
        zoom: 8
      }
    },
    location: {
      latitude: 51.2277411,
      longitude: 6.7734556,
      zoom: 8
    }
  },
  {
    id: '28',
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    price: 180,
    rating: 4.7,
    title: 'Modern flat in downtown Dusseldorf',
    type: 'Apartment',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277411,
        longitude: 6.7734556,
        zoom: 8
      }
    },
    location: {
      latitude: 51.2277411,
      longitude: 6.7734556,
      zoom: 8
    }
  },
  {
    id: '29',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    price: 240,
    rating: 4.9,
    title: 'Luxury penthouse with river view',
    type: 'Apartment',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277411,
        longitude: 6.7734556,
        zoom: 8
      }
    },
    location: {
      latitude: 51.2277411,
      longitude: 6.7734556,
      zoom: 8
    }
  },
  {
    id: '30',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 100,
    rating: 4.3,
    title: 'Bright room with balcony',
    type: 'Room',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277411,
        longitude: 6.7734556,
        zoom: 8
      }
    },
    location: {
      latitude: 51.2277411,
      longitude: 6.7734556,
      zoom: 8
    }
  }
];

const getAuthorizationStatus = () => AuthorizationStatus.Auth;

export { placeCards, getAuthorizationStatus };
