import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducers from 'redux/reducers';
import baseApi from './apis';

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducers,

    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware()
        .concat(baseApi.middleware);

      return middleware;
    },
  });

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
