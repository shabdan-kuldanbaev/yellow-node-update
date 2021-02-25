import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { fetchLayoutData } from 'redux/actions/layout';
import { subscribe, setIsSubscribed } from 'redux/actions/subscribe';
import {
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
} from 'components';
import { toInt, getDataFromLocalStorageWithExpire } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { arrows } from './utils/data';
import styles from './styles.module.scss';

const BlogContainer = ({
  introSection,
  articles,
  fetchLayoutData,
  desktopLimit,
  mobileLimit,
  isMobileResolution,
  totalArticles,
  subscribe,
  setIsSubscribed,
}) => {
  const {
    asPath,
    pathname,
    query: {
      slug: category,
      page,
    },
  } = useRouter();
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const currentPage = toInt(page);
  const pagesCounter = Math.ceil(totalArticles / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));

  const handleOnFormSubmit = (email) => {
    subscribe({ email, pathname });
  };

  useEffect(() => {
    setIsSubscribed(getDataFromLocalStorageWithExpire('isSubscribed'));
  }, []);

  useEffect(() => {
    fetchLayoutData({
      slug: PAGES.blog,
      currentPage,
      currentLimit: deviceLimit,
      category,
      skip: (currentPage - 1) * deviceLimit,
    });
  }, [deviceLimit, asPath]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      <section ref={introSection} className={styles.blog}>
        {!isMobileResolution && <SelectionBlock urlPath={asPath} handleOnSubmit={handleOnFormSubmit} />}
        <ArticlesList
          articles={articles}
          isBlogPage
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

BlogContainer.defaultProps = {
  isMobileResolution: false,
};

BlogContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  fetchLayoutData: PropTypes.func.isRequired,
  desktopLimit: PropTypes.number.isRequired,
  mobileLimit: PropTypes.number.isRequired,
  isMobileResolution: PropTypes.bool,
  subscribe: PropTypes.func.isRequired,
  totalArticles: PropTypes.number.isRequired,
  setIsSubscribed: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    articles: selectArticles(state),
    totalArticles: selectTotalCount(state),
    desktopLimit: selectDesktopLimit(state),
    mobileLimit: selectMobileLimit(state),
    isMobileResolution: selectIsMobileResolutions(state),
  }),
  {
    fetchLayoutData,
    subscribe,
    setIsSubscribed,
  },
)(BlogContainer);
