import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootReducers from 'redux/reducers';
import rootSaga from 'redux/sagas';
import baseApi from './apis';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducers,

    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware()
        .concat(
          sagaMiddleware,
          baseApi.middleware,
        );

      return middleware;
    },
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
