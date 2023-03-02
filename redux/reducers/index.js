import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import layout from './layout';
import clientSide from './client-side';
import blog from './blog';
import portfolio from './portfolio';
import contact from './contact';
import subscribe from './subscribe';
import process from './process';

const reducers = combineReducers({
  layout,
  blog,
  portfolio,
  contact,
  subscribe,
  process,
  clientSide,
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
