import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { loadArticles, setTotalCount } from 'redux/actions/blog';
import {
  selectIsLoading,
  selectArticles,
  selectTotalCount,
  selectDesktopLimit,
  selectMobileLimit,
} from 'redux/selectors/blog';
import {
  SelectionBlock,
  ArticlesList,
  Paginator,
} from 'components';
import { mobileResolution, toInt } from 'utils/helper';
import { articlesData, arrows } from './utils/data';
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
}) => {
  const { asPath, query: { category, page } } = useRouter();
  const [isMobileResolution, setMobileResolution] = useState(false);
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const pagesCounter = Math.ceil(totalCount / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));
  const currentPage = toInt(page);

  useEffect(() => {
    const newArticles = category !== 'latest'
      ? articlesData.filter((article) => article.category === category)
      : articlesData;

    setTotalArticlesCount(newArticles.length);
  }, [category]);

  useEffect(() => {
    if (isMobileResolution !== null) {
      loadNewArticles({ currentPage, currentLimit: deviceLimit, category });
    }

    const onResize = () => (window.innerWidth < mobileResolution ? setMobileResolution(true) : setMobileResolution(false));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobileResolution, asPath]);

  return (
    <section ref={introSection} className={styles.blog}>
      {!isMobileResolution && <SelectionBlock urlPath={asPath} />}
      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        isMobileResolution={isMobileResolution}
        asPath={asPath}
        currentPage={currentPage}
      />
      <Paginator
        isMobileResolution={isMobileResolution}
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
};

export default connect((state) => ({
  isLoading: selectIsLoading(state),
  articles: selectArticles(state),
  totalCount: selectTotalCount(state),
  desktopLimit: selectDesktopLimit(state),
  mobileLimit: selectMobileLimit(state),
}), { loadArticles, setTotalCount })(BlogContainer);
