import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import blogApi from 'redux/apis/blog';

import layout from './layout';
import clientSide from './client-side';
import blog from './blog';
import portfolio from './portfolio';
import contact from './contact';
import subscription from './subscription';

const reducers = combineReducers({
  layout,
  blog,
  portfolio,
  contact,
  subscription,
  clientSide,
  [blogApi.reducerPath]: blogApi.reducer,
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
