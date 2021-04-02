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
} from 'components';
import { getDataFromLocalStorageWithExpire } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { arrows } from './utils/data';
import styles from './styles.module.scss';

const BlogContainer = ({
  introSection,
  articles,
  deviceLimit,
  isMobileResolution,
  totalArticles,
  subscribe: addNewSubscriber,
  setIsSubscribed: setSubscribed,
  currentPage,
}) => {
  const { pathname } = useRouter();
  const pagesCounter = Math.ceil(totalArticles / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));

  const handleOnFormSubmit = (email) => {
    addNewSubscriber({ email, pathname });
  };

  useEffect(() => {
    setSubscribed(getDataFromLocalStorageWithExpire('isSubscribed'));
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      <section ref={introSection} className={styles.blog}>
        {!isMobileResolution && <SelectionBlock handleOnSubmit={handleOnFormSubmit} />}
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
  isMobileResolution: PropTypes.bool,
  subscribe: PropTypes.func.isRequired,
  totalArticles: PropTypes.number.isRequired,
  setIsSubscribed: PropTypes.func.isRequired,
  deviceLimit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
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
