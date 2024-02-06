import { configureStore } from '@reduxjs/toolkit';
import rootReducers from 'store/reducers';
import baseApi from './apis';

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware()
      .concat(baseApi.middleware);

    return middleware;
  },
});
