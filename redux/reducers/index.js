import { combineReducers } from 'redux';
import home from './home';
import layout from './layout';
import blog from './blog';
import portfolio from './portfolio';
import contact from './contact';

export default combineReducers({
  home,
  layout,
  blog,
  portfolio,
  contact,
});
