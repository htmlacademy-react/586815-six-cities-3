import { store } from '../store/index';
import { OfferType, DetailedOfferType, ReviewType } from './common';
import { AuthorizationStatus } from '../const';
import { UserData } from './user';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type State = {
  city: string;
  offers: OfferType[] | never[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersLoading: boolean;
  user: UserData | null;
  detailedOffer: DetailedOfferType | null;
  offerReviews: ReviewType[] | never[];
  nearbyOffers: OfferType[] | never[];
}
