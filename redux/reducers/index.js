import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import home from './home';
import layout from './layout';
import blog from './blog';
import portfolio from './portfolio';
import contact from './contact';
import subscribe from './subscribe';
import process from './process';

const reducers = combineReducers({
  home,
  layout,
  blog,
  portfolio,
  contact,
  subscribe,
  process,
});

export default ((state = {}, action) => {
  switch (action.type) {
  case HYDRATE: return { ...action.payload };

  default: return reducers(state, action);
  }
});
