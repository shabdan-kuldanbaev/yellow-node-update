import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { subscribe, setIsSubscribed } from 'redux/actions/subscribe';
import { selectArticles, selectTotalCount } from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import {
  SelectionBlock,
  ArticlesList,
  Paginator,
  MetaTags,
  PageTitle,
  Breadcrumbs,
  FullLayout,
} from 'components';
import { getDataFromLocalStorageWithExpire, isNumeric } from 'utils/helper';
import {
  CATEGORY_TAGS,
  PAGES,
  ROUTES,
} from 'utils/constants';

import styles from './styles.module.scss';

const BlogContainer = ({
  introSection,
  articles,
  isMobileResolution,
  totalArticles,
  subscribe: addNewSubscriber,
  setIsSubscribed: setSubscribed,
  currentPage,
  articlesNumberPerPage,
}) => {
  const { pathname, query: { slug } } = useRouter();
  const pagesCounter = Math.ceil(totalArticles / articlesNumberPerPage);
  const breadcrumbs = slug && !isNumeric(slug) ? [
    {
      title: ROUTES.blog.title,
      to: ROUTES.blog.path,
    },
    {
      title: CATEGORY_TAGS[slug],
      to: `${ROUTES.blog.path}/${slug}`,
    },
  ] : [{
    title: ROUTES.blog.title,
    to: ROUTES.blog.path,
  }];

  const handleOnFormSubmit = (email) => {
    addNewSubscriber({ email, pathname });
  };

  useEffect(() => {
    setSubscribed(getDataFromLocalStorageWithExpire('isSubscribed'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FullLayout>
      <MetaTags
        page={PAGES.blog}
        pageMetadata={{ pageNumber: currentPage }}
      />
      <section
        ref={introSection}
        className={styles.blog}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageTitle title={ROUTES.blog.title} />
        {!isMobileResolution && <SelectionBlock handleOnSubmit={handleOnFormSubmit} />}
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
      </section>
    </FullLayout>
  );
};

BlogContainer.defaultProps = {
  isMobileResolution: false,
};

BlogContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  isMobileResolution: PropTypes.bool,
  subscribe: PropTypes.func.isRequired,
  totalArticles: PropTypes.number.isRequired,
  setIsSubscribed: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  articlesNumberPerPage: PropTypes.number.isRequired,
};

export default connect(
  (state) => ({
    articles: selectArticles(state),
    totalArticles: selectTotalCount(state),
    isMobileResolution: selectIsMobileResolutions(state),
  }),
  {
    subscribe,
    setIsSubscribed,
  },
)(BlogContainer);
