import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from './i18n';

import store from '@root/redux/store';
import routes from '@root/utils/routes';

import './main.css'

import { userActions } from "@root/redux/actions/auth";
import { RouterProvider } from 'react-router-dom';

store.dispatch(userActions.init());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
