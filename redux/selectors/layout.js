import { Map } from 'immutable';
import { createSelector } from 'reselect';

const selectLayout = () => state => state.get('layout', Map());

export const selectIsMobileMenuOpened  = () => createSelector(selectLayout(), layout => layout.get('isMobileMenuOpened'));
