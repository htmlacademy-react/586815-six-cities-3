import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import { placeCards } from './mocks/offers.ts';
import { reviews } from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={placeCards} reviews={reviews} />
  </React.StrictMode>
);
