import { combineReducers } from 'redux';
import home from './home';
import layout from './layout';
import blog from './blog';
import portfolio from './portfolio';
import contact from './contact';
import subscribe from './subscribe';
import process from './process';
import company from './company';

export default combineReducers({
  home,
  layout,
  blog,
  portfolio,
  contact,
  subscribe,
  process,
  company,
});
