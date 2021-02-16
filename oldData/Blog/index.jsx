import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { loadArticles, setTotalCount } from 'redux/actions/blog';
import {
  selectIsLoading,
  selectArticles,
  selectTotalCount,
  selectDesktopLimit,
  selectMobileLimit,
} from 'redux/selectors/blog';
import { SelectionBlock } from 'components';
import { mobileResolution, toInt } from 'utils/helper';
import Articles from '../Articles';
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
  const { pathname, asPath, query: { category, page } } = useRouter();
  const [isMobileResolution, setMobileResolution] = useState(false);
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const pagesCounter = Math.ceil(totalCount / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));
  const currentPage = toInt(page);
  const currentLimit = isMobileResolution
    ? deviceLimit
    : currentPage === 1 ? deviceLimit : deviceLimit + 1;

  let [mobilePrevious, desktopPrevious, mobileNext, desktopNext] = ['', '', '', ''];
  if (currentPage > 2) mobilePrevious = pagesCounter > 3 ? 'start' : '';
  if (currentPage > 3) desktopPrevious = pagesCounter > 4 ? 'start' : '';
  if (currentPage <= (pagesCounter - 2)) mobileNext = pagesCounter > 4 ? arrows.next : '';
  if (currentPage <= (pagesCounter - 3)) desktopNext = pagesCounter > 5 ? 'next' : '';

  const pushRouter = (currentCategory, nextPage) => {
    window.scrollTo(0, 0);
    Router.push({
      pathname,
      query: {
        category: currentCategory,
        page: nextPage,
      },
    });
  };

  const handleOnPreviousClick = () => pushRouter(category, 1);
  const handleOnPageClick = ({ selected }) => pushRouter(category, selected + 1);

  useEffect(() => {
    const newArticles = category !== 'latest'
      ? articlesData.filter((article) => article.category === category)
      : articlesData;

    setTotalArticlesCount(newArticles.length);
  }, [category]);

  useEffect(() => {
    if (isMobileResolution !== null) {
      loadNewArticles({ currentPage: 1, currentLimit: 11, category: 'latest' });
    }

    const onResize = () => (window.innerWidth < mobileResolution ? setMobileResolution(true) : setMobileResolution(false));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobileResolution, asPath]);

  return (
    <section ref={introSection} className={styles.blog}>
      {!isMobileResolution && <SelectionBlock urlPath={asPath} />}
      <Articles
        articles={articles}
        isLoading={isLoading}
        isMobileResolution={isMobileResolution}
        asPath={asPath}
        currentPage={currentPage}
      />
      <div className={styles.paginationWrapper}>
        <span className={styles.paginationPrev} onClick={handleOnPreviousClick}>
          {isMobileResolution ? mobilePrevious : desktopPrevious}
        </span>
        {/* <ReactPaginate
          pageCount={pagesCounter}
          pageRangeDisplayed={isMobileResolution ? 3 : 4}
          marginPagesDisplayed={0}
          nextLabel={isMobileResolution ? mobileNext : desktopNext}
          containerClassName={styles.paginationContainer}
          pageClassName={styles.paginationItem}
          pageLinkClassName={styles.paginationLink}
          activeLinkClassName={styles.paginationActiveLink}
          breakClassName={styles.paginationEmptyItem}
          breakLinkClassName={styles.paginationEmptyLink}
          previousClassName={styles.previousClassName}
          nextLinkClassName={styles.paginationNext}
          disableInitialCallback
          forcePage={currentPage - 1}
          onPageChange={handleOnPageClick}
        /> */}
      </div>
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
