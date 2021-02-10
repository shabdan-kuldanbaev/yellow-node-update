import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { fetchBlogData } from 'redux/actions/layout';
import { subscribe, setIsSubscribed } from 'redux/actions/subscribe';
import {
  selectArticles,
  selectDesktopLimit,
  selectMobileLimit,
  selectTotalCount,
} from 'redux/selectors/blog';
import { selectIsMobileResolutions, selectIsLoading } from 'redux/selectors/layout';
import {
  SelectionBlock,
  ArticlesList,
  Paginator,
  MetaTags,
  LoadingPage,
} from 'components';
import { toInt, getDataFromLocalStorageWithExpire } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { arrows } from './utils/data';
import styles from './styles.module.scss';

const BlogContainer = ({
  introSection,
  articles,
  isLoading,
  fetchBlogData,
  desktopLimit,
  mobileLimit,
  isMobileResolution,
  totalArticles,
  subscribe,
  setIsSubscribed,
}) => {
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
  const { asPath, query: { category, page }, pathname } = useRouter();
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const currentPage = toInt(page);
  const pagesCounter = Math.ceil(totalArticles / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));

  const handleOnFormSubmit = (email) => {
    subscribe({ email, pathname });
  };
  const handleOnAnimationComplete = () => setIsAnimationEnded(true);

  useEffect(() => {
    setIsSubscribed(getDataFromLocalStorageWithExpire('isSubscribed'));
  }, []);

  useEffect(() => {
    if (!isMobileResolution) {
      fetchBlogData({
        pageSlug: PAGES.blog,
        currentPage,
        currentLimit: deviceLimit,
        category,
        skip: (currentPage - 1) * deviceLimit,
      });
    }
    setIsAnimationEnded(false);
  }, [deviceLimit, asPath]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      { !isAnimationEnded ? (
        <LoadingPage isLoading={isLoading} handleOnAnimationComplete={handleOnAnimationComplete} />
      ) : (
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
      ) }
    </Fragment>
  );
};

BlogContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchBlogData: PropTypes.func.isRequired,
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
    fetchBlogData,
    subscribe,
    setIsSubscribed,
  },
)(BlogContainer);
