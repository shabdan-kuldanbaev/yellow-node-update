import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootReducers from 'redux/reducers';
import rootSaga from 'redux/sagas';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducers,

    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware()
        .concat(sagaMiddleware);

      return middleware;
    },
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
