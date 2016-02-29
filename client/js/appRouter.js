import React from 'react';
import { Router, Route, Link, browserHistory, memoryHistory } from 'react-router';

import App from './components/app';
import Details from './components/details';
import Add from './components/add';

let history = typeof(window) !== 'undefined'
              ? browserHistory
              //This kind of history is needed for server-side rendering.
              : memoryHistory;

var appRouter = (
  <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/add" component={Add} />  
      </Route>
      <Route path="/contact/:contactId" component={Details} />                          
  </Router>
);

export default appRouter;