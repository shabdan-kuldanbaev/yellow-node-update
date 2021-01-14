import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { loadArticles, setTotalCount } from 'redux/actions/blog';
import { subscribe } from 'redux/actions/subscribe';
import {
  selectIsLoading,
  selectArticles,
  selectDesktopLimit,
  selectMobileLimit,
} from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import {
  SelectionBlock,
  ArticlesList,
  Paginator,
  MetaTags,
} from 'components';
import { toInt } from 'utils/helper';
import { pages } from 'utils/constants';
import { arrows } from './utils/data';
import styles from './styles.module.scss';

const BlogContainer = ({
  introSection,
  articles,
  isLoading,
  loadArticles: loadNewArticles,
  setTotalCount: setTotalArticlesCount,
  desktopLimit,
  mobileLimit,
  isMobileResolution,
  subscribe,
}) => {
  const { asPath, query: { category, page }, pathname } = useRouter();
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const currentPage = toInt(page);
  const articlesArray = get(articles, 'items', []);
  const totalArticles = get(articles, 'total');
  const pagesCounter = Math.ceil(totalArticles / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));

  useEffect(() => {
    // TODO
    // const newArticles = category !== 'latest'
    //   ? articlesData.filter((article) => article.categoryTag === category)
    //   : articlesData;

    setTotalArticlesCount(totalArticles);
  }, [category]);

  useEffect(() => {
    if (isMobileResolution !== null) {
      loadNewArticles({
        currentPage,
        currentLimit: deviceLimit,
        category,
        skip: (currentPage - 1) * deviceLimit,
      });
    }
  }, [isMobileResolution, asPath]);

  const handleOnFormSubmit = (email) => {
    subscribe({ email, pathname });
  };

  return (
    <Fragment>
      <MetaTags page={pages.blog} />
      <section ref={introSection} className={styles.blog}>
        {!isMobileResolution && <SelectionBlock urlPath={asPath} handleOnSubmit={handleOnFormSubmit} />}
        <ArticlesList
          articles={articlesArray}
          isLoading={isLoading}
          asPath={asPath}
          currentPage={currentPage}
          handleOnFormSubmit={handleOnFormSubmit}
        />
        <Paginator
          arrows={arrows}
          pagesCounter={pagesCounter}
          currentPage={currentPage}
        />
      </section>
    </Fragment>
  );
};

BlogContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadArticles: PropTypes.func.isRequired,
  setTotalCount: PropTypes.func.isRequired,
  desktopLimit: PropTypes.number.isRequired,
  mobileLimit: PropTypes.number.isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
  subscribe: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state),
    desktopLimit: selectDesktopLimit(state),
    mobileLimit: selectMobileLimit(state),
    isMobileResolution: selectIsMobileResolutions(state),
  }), {
    loadArticles,
    setTotalCount,
    subscribe,
  },
)(BlogContainer);
