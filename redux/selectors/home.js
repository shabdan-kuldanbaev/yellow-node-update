import { Map } from 'immutable';
import { createSelector } from 'reselect';

const selectHome = () => state => state.get('home', Map());

export const selectIsModelLoaded = () => createSelector(selectHome(), home => home.get('isModelLoaded'));

export const selectScrollOfAddedFooter = () => createSelector(selectHome(), home => home.get('scrollOfAddedFooter'));
