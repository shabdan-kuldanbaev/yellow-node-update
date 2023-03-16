import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import baseApi from 'redux/apis';
import layout from './layout';
import contact from './contact';

const reducers = combineReducers({
  layout,
  contact,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default ((state, action) => {
  if (action.type === HYDRATE) {
    delete action.payload.layout;

    return {
      ...state,
      ...action.payload,
    };
  }

  return reducers(state, action);
});
