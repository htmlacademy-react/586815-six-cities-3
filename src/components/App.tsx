import MainPage from '../pages/main-page';
import { OfferType } from '../types/common';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from '../const';
import NotFoundPage from '../pages/not-found-page';
import Favorites from '../pages/favorites';
import Login from '../pages/login';
import Offer from '../pages/offer';
import PrivateRoute from './private-route';
import {HelmetProvider} from 'react-helmet-async';
import { getAuthorizationStatus } from '../mocks/mocks';

type Props = {
  cards:OfferType[];
}

function App(props: Props): JSX.Element {
  const {cards} = props;
  const favoritesOffers = cards.filter((card) => card.isFavorite);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage cards={cards} authorizationStatus={getAuthorizationStatus()} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={getAuthorizationStatus()}
              >
                <Favorites cards={favoritesOffers} authorizationStatus = {getAuthorizationStatus()} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <Login authorizationStatus={getAuthorizationStatus()} />
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer cards={cards} authorizationStatus={getAuthorizationStatus()}/>}
          />
          <Route
            path="*"
            element={<NotFoundPage authorizationStatus={getAuthorizationStatus()} />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
