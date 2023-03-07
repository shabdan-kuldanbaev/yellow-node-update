export const selectArticle = (state) => state.blog.single;

export const selectArticles = (state) => state.blog.all;

export const selectRelatedArticles = (state) => state.blog.related;

export const selectNearbyArticles = (state) => state.blog.nearby;

export const selectTotalCount = (state) => state.blog.totalCount;

export const selectFoundArticles = (state) => state.blog.found;

export const selectSearchMessage = (state) => state.blog.searchMessage;
