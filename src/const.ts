export const SCALE_RATING = 20;

export const VISIBLE_REVIEWS_AMOUNT = 10;

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Main = '/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum ShowMoreButtonText {
  SHOW = 'Show more reviews',
  HIDE = 'Hide reviews'
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';
