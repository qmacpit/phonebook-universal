import React from 'react';
import ReactDOM from 'react-dom';
import appRouter from './appRouter';
import { Provider } from 'react-redux';

import configureStore from './store/contactsStore';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={store}>
    {appRouter}
  </Provider>,
  document.getElementById('root')
);
