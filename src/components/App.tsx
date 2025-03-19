import MainPage from '../pages/main-page';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import NotFoundPage from '../pages/not-found-page';
import Favorites from '../pages/favorites';
import Login from '../pages/login';
import Offer from '../pages/offer';
import PrivateRoute from './private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../hooks/store';
import Loader from '../loader';
import { RequestStatus } from '../const';

function App(): JSX.Element {
  const initialedOffers = useAppSelector((state) => state.offers.items);
  const favoritesOffers = useAppSelector(({ favorites: state }) => state.items);
  const authorizationStatus = useAppSelector((state) => state.user.authStatus);
  const isOffersLoading = useAppSelector((state) => state.offers.status);

  if (isOffersLoading === RequestStatus.Loading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offers={initialedOffers} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <Favorites favoritesOffers={favoritesOffers} />
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
            element={<Offer authorizationStatus={authorizationStatus} />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
