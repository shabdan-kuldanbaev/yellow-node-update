import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe, setIsSubscribed } from 'redux/actions/subscribe';
import { selectArticles, selectTotalCount } from 'redux/selectors/blog';
import { selectMetaData } from 'redux/selectors/layout';
import SelectionBlock from 'components/BlogCommon/SelectionBlock';
import ArticlesList from 'components/BlogCommon/ArticlesList';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import Paginator from 'components/Common/Paginator';
import FullLayout from 'components/Layout/FullLayout';
import { getDataFromLocalStorageWithExpire, rootUrl } from 'utils/helper';
import {
  PAGES,
  ROUTES,
  CATEGORY_SLUGS,
} from 'utils/constants';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { categoriesMetaData } from './utils/data';
import { findTagBySlug, getTagSlugs } from './utils/blogContainerHelper';

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
    asPath,
  } = useRouter();
  const pagesCounter = Math.ceil(totalArticles / articlesNumberPerPage);
  const breadcrumbs = pagesBreadcrumbs.blog(slug, tagsList);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}${asPath}`,
    pageNumber: currentPage,
  };
  let tagTitle = '';

  if (tagsList.map((tag) => tag.slug).includes(slug)) {
    pageMetadata.metaRobots = 'noindex,follow';
  }

  if (CATEGORY_SLUGS.includes(slug) && categoriesMetaData[slug]) {
    const {
      metaTitle: categoryMetaTitle,
      metaDescription: categoryMetaDescription,
    } = categoriesMetaData[slug];
    pageMetadata.metaTitle = categoryMetaTitle;
    pageMetadata.metaDescription = categoryMetaDescription;
  }

  if (getTagSlugs(tagsList).includes(slug)) {
    const tagInfo = findTagBySlug(tagsList, slug);

    if (tagInfo.title) {
      pageMetadata.metaTitle = `Tag: ${tagInfo.title} | Yellow`;
      tagTitle = tagInfo.title;
    }

    if (tagInfo.description) {
      pageMetadata.metaDescription = tagInfo.description;
    }
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
          title={tagTitle || ROUTES.blog.title}
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
