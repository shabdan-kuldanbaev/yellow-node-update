import { Map } from 'immutable';
import { createSelector } from 'reselect';

const selectBlog = () => state => state.get('blog', Map());

export const selectIsLoading = () => createSelector(selectBlog(), blog => blog.get('isLoading'));

export const selectPost = () => createSelector(selectBlog(), blog => blog.get('single'));

export const selectPosts = () => createSelector(selectBlog(), blog => blog.get('all'));

export const selectTotalCount = () => createSelector(selectBlog(), blog => blog.get('totalCount'));

export const selectLimit = () => createSelector(selectBlog(), blog => blog.get('limit'));
