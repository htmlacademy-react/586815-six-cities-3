import MainPage from '../pages/main-page';
import { OfferType } from '../types/common';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import NotFoundPage from '../pages/not-found-page';
import Favorites from '../pages/favorites';
import Login from '../pages/login';
import Offer from '../pages/offer';
import PrivateRoute from './private-route';
import { HelmetProvider } from 'react-helmet-async';
import { getAuthorizationStatus } from '../mocks/mocks';

type Props = {
  offers: OfferType[];
}

function App(props: Props): JSX.Element {
  const { offers } = props;
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);
  const authorizationStatus = getAuthorizationStatus();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offers={offers} authorizationStatus={authorizationStatus} />}
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
            element={<Offer offers={offers} authorizationStatus={authorizationStatus} />}
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
