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
import { isOffersLoading } from '../store/selectors/offers';

function App(): JSX.Element {
  const isLoading = useAppSelector(isOffersLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites />
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
            element={<Offer />}
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
