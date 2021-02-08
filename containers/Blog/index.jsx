import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { loadArticles } from 'redux/actions/blog';
import { subscribe, setIsSubscribed } from 'redux/actions/subscribe';
import {
  selectIsLoading,
  selectArticles,
  selectDesktopLimit,
  selectMobileLimit,
  selectTotalCount,
} from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import {
  SelectionBlock,
  ArticlesList,
  Paginator,
  MetaTags,
  LoadingPage,
} from 'components';
import { toInt } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { arrows } from './utils/data';
import styles from './styles.module.scss';
import { getWithExpiry } from '../../utils/localStorageUtils';

const BlogContainer = ({
  introSection,
  articles,
  isLoading,
  loadArticles: loadNewArticles,
  desktopLimit,
  mobileLimit,
  isMobileResolution,
  totalArticles,
  subscribe,
  setIsSubscribed,
}) => {
  const { asPath, query: { category, page }, pathname } = useRouter();
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const currentPage = toInt(page);
  const pagesCounter = Math.ceil(totalArticles / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));

  const handleOnFormSubmit = (email) => {
    subscribe({ email, pathname });
  };

  useEffect(() => {
    const isSubscribed = getWithExpiry('isSubscribed');

    setIsSubscribed(isSubscribed);
  }, []);

  useEffect(() => {
    if (!isMobileResolution) {
      loadNewArticles({
        currentPage,
        currentLimit: deviceLimit,
        category,
        skip: (currentPage - 1) * deviceLimit,
      });
    }
  }, [deviceLimit, asPath]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      <LoadingPage isLoading={isLoading} />
      <section ref={introSection} className={styles.blog}>
        {!isMobileResolution && <SelectionBlock urlPath={asPath} handleOnSubmit={handleOnFormSubmit} />}
        <ArticlesList
          articles={articles}
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
  desktopLimit: PropTypes.number.isRequired,
  mobileLimit: PropTypes.number.isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
  subscribe: PropTypes.func.isRequired,
  totalArticles: PropTypes.number.isRequired,
  setIsSubscribed: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state),
    totalArticles: selectTotalCount(state),
    desktopLimit: selectDesktopLimit(state),
    mobileLimit: selectMobileLimit(state),
    isMobileResolution: selectIsMobileResolutions(state),
  }), {
    loadArticles,
    subscribe,
    setIsSubscribed,
  },
)(BlogContainer);
