import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import contactsReducer from '../reducers/reducers';

export default function configureStore(initialState) {

  const store = typeof window !== "undefined" 
  ? createStore(
    contactsReducer,
    initialState,    
    applyMiddleware(thunkMiddleware, createLogger())
  )
  : createStore(
    contactsReducer,
    initialState  
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducers', () => {
      const nextRootReducer = require('../reducers/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
