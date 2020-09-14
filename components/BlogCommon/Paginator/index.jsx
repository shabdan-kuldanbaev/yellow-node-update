import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Router, { useRouter } from 'next/router';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import styles from './styles.module.scss';

const Paginator = ({
  isMobileResolution,
  arrows,
  pagesCounter,
  currentPage,
}) => {
  const { pathname, query: { category } } = useRouter();
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

  return (
    <div className={styles.paginationWrapper}>
      <span className={styles.paginationPrev} onClick={handleOnPreviousClick}>
        {isMobileResolution ? mobilePrevious : desktopPrevious}
      </span>
      <ReactPaginate
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
      />
    </div>
  );
};

Paginator.propTypes = {
  isMobileResolution: PropTypes.bool.isRequired,
  arrows: PropTypes.instanceOf(Object).isRequired,
  pagesCounter: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default connect((state) => ({
  isMobileResolution: selectIsMobileResolutions(state),
}))(Paginator);
