import { Map } from 'immutable';
import { createSelector } from 'reselect';

const selectBlog = () => state => state.get('blog', Map());

export const selectIsLoading = () => createSelector(selectBlog(), blog => blog.get('isLoading'));

export const selectArticle = () => createSelector(selectBlog(), blog => blog.get('single'));

export const selectArticles = () => createSelector(selectBlog(), blog => blog.get('all'));

export const selectTotalCount = () => createSelector(selectBlog(), blog => blog.get('totalCount'));

export const selectDesktopLimit = () => createSelector(selectBlog(), blog => blog.getIn(['limit', 'desktop']));

export const selectMobileLimit = () => createSelector(selectBlog(), blog => blog.getIn(['limit', 'mobile']));
