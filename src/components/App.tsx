import MainPage from '../pages/main-page';
import { OfferType, ReviewType } from '../types/common';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import NotFoundPage from '../pages/not-found-page';
import Favorites from '../pages/favorites';
import Login from '../pages/login';
import Offer from '../pages/offer';
import PrivateRoute from './private-route';
import { HelmetProvider } from 'react-helmet-async';
import { getAuthorizationStatus } from '../mocks/offers';
import { useAppDispatch, useAppSelector } from '../hooks';
import { initialOffers } from '../store/action';

type Props = {
  offers: OfferType[];
  reviews: ReviewType[];
}

function App(props: Props): JSX.Element {
  const { offers, reviews } = props;

  const dispatch = useAppDispatch();
  dispatch(initialOffers(offers));

  const initialedOffers = useAppSelector((state) => state.offers);

  const favoritesOffers = initialedOffers.filter((offer) => offer.isFavorite);
  const authorizationStatus = getAuthorizationStatus();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offers={initialedOffers} authorizationStatus={authorizationStatus} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <Favorites favoritesOffers={favoritesOffers} authorizationStatus={authorizationStatus} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <Login authorizationStatus={authorizationStatus} />
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer offers={initialedOffers} reviews={reviews} authorizationStatus={authorizationStatus} />}
          />
          <Route
            path="*"
            element={<NotFoundPage authorizationStatus={authorizationStatus} />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
