import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './components/App.tsx';
import { store } from './store/index';
import { offersActions } from './store/slices/offers.ts';
import { userActions } from './store/slices/user.ts';
import { fetchFavoritesOffers } from './store/thunks/favorites.ts';
import { BrowserRouter } from 'react-router-dom';

const { fetchOffers } = offersActions;
const { checkAuthAction } = userActions;

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction());
if (store.getState().user.info) {
  store.dispatch(fetchFavoritesOffers());
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
