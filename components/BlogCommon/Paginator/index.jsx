import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Router, { useRouter } from 'next/router';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const Paginator = ({
  isMobileResolution,
  arrows,
  pagesCounter,
  currentPage,
}) => {
  const { query: { slug: category } } = useRouter();
  let [mobilePrevious, desktopPrevious, mobileNext, desktopNext] = ['', '', '', ''];
  let nextPathname = ROUTES.blog.getPath(category).dynamicPath;

  if (currentPage > 2) mobilePrevious = pagesCounter > 3 ? 'start' : '';
  if (currentPage > 3) desktopPrevious = pagesCounter > 4 ? 'start' : '';
  if (currentPage <= (pagesCounter - 2)) mobileNext = pagesCounter > 4 ? arrows.next : '';
  if (currentPage <= (pagesCounter - 3)) desktopNext = pagesCounter > 5 ? 'next' : '';

  const pushRouter = (currentCategory, nextPage) => {
    const { page, slug, root } = ROUTES.blog.dynamicPath;
    const pathname = ROUTES.blog.getPath(currentCategory, nextPage).path;
    const slashCount = pathname.split('/').length - 1;
    nextPathname = root;

    if (slashCount === 2) {
      nextPathname = slug;
    } else if (slashCount === 3) {
      nextPathname = page;
    }

    window.scrollTo(0, 0);
    Router.push({ pathname: nextPathname }, { pathname });
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

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(Paginator);
