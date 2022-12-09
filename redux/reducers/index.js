import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import isNull from 'lodash/isNull';
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

// eslint-disable-next-line default-param-last
export default ((state = {}, action) => {
  switch (action.type) {
  case HYDRATE: {
    const { isTabletResolutions, isFullResolution, isMobileResolutions } = action.payload.layout;

    isNull(isTabletResolutions) && delete action.payload.layout.isTabletResolutions;
    isNull(isFullResolution) && delete action.payload.layout.isFullResolution;
    isNull(isMobileResolutions) && delete action.payload.layout.isMobileResolutions;

    return {
      ...state,
      ...action.payload,
      layout: {
        ...state.layout,
        ...action.payload.layout,
      },
    };
  }

  default: return reducers(state, action);
  }
});
