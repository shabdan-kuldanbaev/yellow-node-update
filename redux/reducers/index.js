import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import baseApi from 'redux/apis';
import layout from './layout';
import clientSide from './client-side';
import blog from './blog';
import contact from './contact';
import subscription from './subscription';

const reducers = combineReducers({
  layout,
  blog,
  contact,
  subscription,
  clientSide,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default ((state, action) => {
  if (action.type === HYDRATE) {
    delete action.payload.clientSide;

    return {
      ...state,
      ...action.payload,
    };
  }

  return reducers(state, action);
});
