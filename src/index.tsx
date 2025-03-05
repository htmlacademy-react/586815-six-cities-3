import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import { reviews } from './mocks/reviews.ts';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { fetchOffers, checkAuthAction } from './store/api-actions.ts';

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviews} />
    </Provider>
  </React.StrictMode>
);
