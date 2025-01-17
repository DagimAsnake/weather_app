import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import { Provider } from 'react-redux';
import store from './app/store';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback='loading...'>
      <Provider store={store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);
