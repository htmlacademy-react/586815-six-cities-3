import leaflet from 'leaflet';

export const SCALE_RATING = 20;

export const VISIBLE_REVIEWS_AMOUNT = 10;

export const NEAR_OFFERS_AMOUNT = 3;

export const TIMEOUT_SHOW_ERROR = 2000;

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorite',
  Offer = '/offer/:id',
  Main = '/',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ShowMoreButtonText {
  SHOW = 'Show more reviews',
  HIDE = 'Hide reviews'
}

export enum classNamesMap {
  cities = 'cities__map',
  offer = 'offer__map'
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const defaultCustomIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export const currentCustomIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export const SortingOptions = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGH: 'Price: low to high',
  PRICE_HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments',
}

export enum FavoritesStatus {
  Added = 1,
  Removed = 0
}

export enum TypeBookmark {
  Offer = 'offer',
  PlaceCard = 'place-card'
}
