import MainPage from '../../pages/main-page/main-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/store';
import Loader from '../loader/loader';
import { getLoadingStatus } from '../../store/selectors/loading';

function App(): JSX.Element {
	const isLoading = useAppSelector(getLoadingStatus);

	return (
		<HelmetProvider>
			{isLoading && <Loader />}
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
						<PrivateRoute reverse >
							<Login />
						</PrivateRoute>
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
		</HelmetProvider>
	);
}

export default App;
