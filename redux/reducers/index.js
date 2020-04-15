import { combineReducers } from 'redux-immutable';
import home from './home';
import layout from './layout';
import blog from './blog';

export default combineReducers({
  home,
  layout,
  blog,
});
