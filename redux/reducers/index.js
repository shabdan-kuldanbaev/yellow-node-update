import { combineReducers } from 'redux-immutable';
import home from './home';
import layout from './layout';

export default combineReducers({
  home,
  layout,
});
