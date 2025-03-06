import MainPage from '../pages/main-page';
import { ReviewType } from '../types/common';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import NotFoundPage from '../pages/not-found-page';
import Favorites from '../pages/favorites';
import Login from '../pages/login';
import Offer from '../pages/offer';
import PrivateRoute from './private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../hooks';
import Loader from '../loader';
import { AuthorizationStatus } from '../const';

type Props = {
  reviews: ReviewType[];
}

function App(props: Props): JSX.Element {
  const { reviews } = props;

  const initialedOffers = useAppSelector((state) => state.offers);

  const favoritesOffers = initialedOffers.filter((offer) => offer.isFavorite);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <Loader />;
  }

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
              <Login />
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
