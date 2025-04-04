export const SCALE_RATING = 20;
export const VISIBLE_REVIEWS_AMOUNT = 10;
export const NEAR_OFFERS_AMOUNT = 3;
export const TIMEOUT_SHOW_ERROR = 2000;
export const REVIEW_MIN_SIZE = 50;
export const REVIEW_MAX_SIZE = 300;
export const MAX_IMAGES_COUNT = 6;
export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Main = '/',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ShowMoreButtonText {
  Show = 'Show more reviews',
  Hide = 'Hide reviews'
}

export enum SortingOptions {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

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
