import { combineReducers } from 'redux';
import home from './home';
import layout from './layout';
import blog from './blog';
import portfolio from './portfolio';

export default combineReducers({
  home,
  layout,
  blog,
  portfolio,
});
