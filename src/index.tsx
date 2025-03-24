import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { ToastContainer } from 'react-toastify';
import { offersActions } from './store/slices/offers.ts';
import { userActions } from './store/slices/user.ts';
import { fetchFavoritesOffers } from './store/thunks/favorites.ts';

const { fetchOffers } = offersActions;
const { checkAuthAction } = userActions;

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction())
  .unwrap()
  .then(() => {
    store.dispatch(fetchFavoritesOffers());
  });


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
