import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { loadArticles, setTotalCount } from 'redux/actions/blog';
import { subscribe } from 'redux/actions/subscribe';
import {
  selectIsLoading,
  selectArticles,
  selectTotalCount,
  selectDesktopLimit,
  selectMobileLimit,
} from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import {
  SelectionBlock,
  ArticlesList,
  Paginator,
} from 'components';
import { toInt } from 'utils/helper';
import { arrows } from './utils/data';
import styles from './styles.module.scss';

const BlogContainer = ({
  introSection,
  articles,
  isLoading,
  loadArticles: loadNewArticles,
  setTotalCount: setTotalArticlesCount,
  totalCount,
  desktopLimit,
  mobileLimit,
  isMobileResolution,
  subscribe,
}) => {
  const { asPath, query: { category, page }, pathname } = useRouter();
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const pagesCounter = Math.ceil(totalCount / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));
  const currentPage = toInt(page);
  const articlesArray = get(articles, 'items', []);
  const totalArticles = get(articles, 'total');

  useEffect(() => {
    // TODO
    // const newArticles = category !== 'latest'
    //   ? articlesData.filter((article) => article.categoryTag === category)
    //   : articlesData;

    // setTotalArticlesCount(newArticles.length);
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
  );
};

BlogContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadArticles: PropTypes.func.isRequired,
  setTotalCount: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  desktopLimit: PropTypes.number.isRequired,
  mobileLimit: PropTypes.number.isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
  subscribe: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state),
    totalCount: selectTotalCount(state),
    desktopLimit: selectDesktopLimit(state),
    mobileLimit: selectMobileLimit(state),
    isMobileResolution: selectIsMobileResolutions(state),
  }), {
    loadArticles,
    setTotalCount,
    subscribe,
  },
)(BlogContainer);
