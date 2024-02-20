import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import cn from 'classnames';
import { usePaginator } from './utils/usePaginator';
import styles from './styles.module.scss';

const Paginator = (props) => {
  const {
    previous,
    next,
    pagesCounter,
    currentPage,
    className,
    handleOnPageClick,
    handleOnPreviousClick,
  } = usePaginator(props);

  return (
    <div className={cn(styles.paginationWrapper, className)}>
      <span
        className={styles.paginationPrev}
        onClick={handleOnPreviousClick}
        role="button"
        tabIndex="0"
      >
        {previous}
      </span>
      <ReactPaginate
        pageCount={pagesCounter}
        pageRangeDisplayed={4}
        marginPagesDisplayed={0}
        nextLabel={next}
        containerClassName={styles.paginationContainer}
        pageClassName={styles.paginationItem}
        pageLinkClassName={styles.paginationLink}
        activeClassName={styles.paginationActiveClassName}
        activeLinkClassName={styles.paginationActiveLink}
        breakClassName={styles.paginationEmptyItem}
        breakLinkClassName={styles.paginationEmptyLink}
        previousClassName={styles.previousClassName}
        nextClassName={styles.paginationNextWrapper}
        nextLinkClassName={styles.paginationNext}
        disableInitialCallback
        forcePage={currentPage - 1}
        onPageChange={handleOnPageClick}
      />
    </div>
  );
};

Paginator.propTypes = {
  pagesCounter: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSlug: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Paginator;
