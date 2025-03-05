import { store } from '../store/index';
import { OfferType } from './common';
import { AuthorizationStatus } from '../const';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type State = {
  city: string;
  offers: OfferType[] | never[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersLoading: boolean;
}
