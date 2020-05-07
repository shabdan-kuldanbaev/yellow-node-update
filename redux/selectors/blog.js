export const selectIsLoading = (state) => state.blog.isLoading;

export const selectArticle = (state) => state.blog.single;

export const selectArticles = (state) => state.blog.all;

export const selectTotalCount = (state) => state.blog.totalCount;

export const selectDesktopLimit = (state) => state.blog.limit.desktop;

export const selectMobileLimit = (state) => state.blog.limit.mobile;
