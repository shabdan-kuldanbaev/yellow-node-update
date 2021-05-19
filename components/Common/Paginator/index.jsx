import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Router, { useRouter } from 'next/router';
import cn from 'classnames';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { ROUTES } from 'utils/constants';
import { arrows } from './utils/data';
import styles from './styles.module.scss';

const Paginator = ({
  isMobileResolution,
  arrows: navigationArrows,
  pagesCounter,
  currentPage,
  pageSlug,
  className,
}) => {
  const { query: { slug: category } } = useRouter();
  let [mobilePrevious, desktopPrevious, mobileNext, desktopNext] = ['', '', '', ''];

  if (currentPage > 2) mobilePrevious = pagesCounter > 3 ? 'start' : '';

  if (currentPage > 3) desktopPrevious = pagesCounter > 4 ? 'start' : '';

  if (currentPage <= (pagesCounter - 2)) mobileNext = pagesCounter > 4 ? navigationArrows.next : '';

  if (currentPage <= (pagesCounter - 3)) desktopNext = pagesCounter > 5 ? 'next' : '';

  const pushRouter = (currentCategory, nextPage) => {
    const { path, dynamicPath } = ROUTES[pageSlug].getRoute(currentCategory, nextPage);

    window.scrollTo(0, 0);
    Router.push(
      { pathname: dynamicPath },
      { pathname: path },
    );
  };
  const handleOnPreviousClick = () => pushRouter(category, 1);
  const handleOnPageClick = ({ selected }) => pushRouter(category, selected + 1);

  return (
    <div className={cn(styles.paginationWrapper, className)}>
      <span
        className={styles.paginationPrev}
        onClick={handleOnPreviousClick}
        role="button"
        tabIndex="0"
      >
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

Paginator.defaultProps = {
  className: '',
  arrows,
  isMobileResolution: false,
};

Paginator.propTypes = {
  isMobileResolution: PropTypes.bool,
  arrows: PropTypes.instanceOf(Object),
  pagesCounter: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSlug: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(Paginator);
