import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSubscribed, subscribe } from 'redux/actions/subscribe';
import { selectArticles, selectTotalCount } from 'redux/selectors/blog';
import { selectMetaData } from 'redux/selectors/layout';
import SelectionBlock from 'components/BlogCommon/SelectionBlock';
import ArticlesList from 'components/BlogCommon/ArticlesList';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import Paginator from 'UI/components/Paginator';
import FullLayout from 'components/Layout/FullLayout';
import { getDataFromLocalStorageWithExpire, rootUrl } from 'utils/helper';
import { PAGES, ROUTES } from 'utils/constants';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { categoriesMetaData } from './utils/data';
import { findCategoryBySlug, findTagBySlug } from './utils/blogContainerHelper';

const BlogContainer = ({
  tagsList,
  introSection,
  currentPage,
  articlesNumberPerPage,
}) => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const totalArticles = useSelector(selectTotalCount);
  const metaData = useSelector(selectMetaData);

  const {
    pathname,
    query: { slug },
  } = useRouter();

  const tag = findTagBySlug(tagsList, slug);
  const category = findCategoryBySlug(categoriesMetaData, slug);

  const pagesCounter = Math.ceil(totalArticles / articlesNumberPerPage);
  const breadcrumbs = pagesBreadcrumbs.blog(slug, tagsList);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/${PAGES.blog}`,
    pageNumber: currentPage,
  };

  if (tag || category) {
    pageMetadata.metaRobots = 'noindex,follow';
  }

  let pageTitle = '';

  if (category) {
    const {
      metaTitle: categoryMetaTitle,
      metaDescription: categoryMetaDescription,
      pageTitle: categoryTitle,
    } = category;

    pageMetadata.metaTitle = categoryMetaTitle;
    pageMetadata.metaDescription = categoryMetaDescription;
    pageTitle = categoryTitle;
  }

  if (tag) {
    const {
      title: tagTitle,
      description: tagDescription,
    } = tag;

    pageMetadata.metaTitle = `Tag: ${tagTitle} | Yellow`;
    pageMetadata.metaDescription = tagDescription;
    pageTitle = tagTitle;
  }

  const handleOnFormSubmit = (email) => {
    dispatch(subscribe({ email, pathname }));
  };

  useEffect(() => {
    dispatch(setIsSubscribed(getDataFromLocalStorageWithExpire('isSubscribed')));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MetaTags
        page={PAGES.blog}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={pageTitle || ROUTES.blog.title}
          breadcrumbs={breadcrumbs}
        />
        <SelectionBlock handleOnSubmit={handleOnFormSubmit} />
        <ArticlesList
          articles={articles}
          isBlogPage
          currentPage={currentPage}
          handleOnFormSubmit={handleOnFormSubmit}
        />
        <Paginator
          pagesCounter={pagesCounter}
          currentPage={currentPage}
          pageSlug={ROUTES.blog.slug}
        />
      </FullLayout>
    </>
  );
};

BlogContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentPage: PropTypes.number.isRequired,
  articlesNumberPerPage: PropTypes.number.isRequired,
};

export default BlogContainer;
