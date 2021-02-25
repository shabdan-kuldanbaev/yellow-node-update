import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducers from 'redux/reducers';
import rootSaga from 'redux/sagas';

const bindMiddleware = (middleware) => (process.env.NODE_ENV !== 'production'
  ? composeWithDevTools(applyMiddleware(...middleware, logger))
  : applyMiddleware(...middleware));

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducers,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export const wrapper = createWrapper(configureStore, { debug: false });
