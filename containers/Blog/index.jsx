import React, { useEffect, useState } from 'react';
import { SelectionBlock, Articles } from 'components';
import ReactPaginate from 'react-paginate';
import { mobileResolution, toInt } from 'utils/helper';
import Router, { useRouter } from 'next/router';
import {
  selectIsLoading,
  selectArticles,
  selectTotalCount,
  selectDesktopLimit,
  selectMobileLimit,
} from 'redux/selectors/blog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadArticles, setTotalCount } from 'redux/actions/blog';
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
  const {
    pathname,
    asPath,
    query: { category, page },
  } = useRouter();
  const [isMobileResolution, setMobileResolution] = useState(false);
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const pagesCounter = Math.ceil(totalCount / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));
  const currentPage = toInt(page);

  const handleOnPageClick = ({ selected }) => {
    window.scrollTo(0, 0);
    Router.push({
      pathname,
      query: {
        category,
        page: selected + 1,
      },
    });
  };

  useEffect(() => {
    const newArticles = category !== 'latest'
      ? articlesData.filter((article) => article.category === category)
      : articlesData;

    setTotalArticlesCount(newArticles.length);
  }, [category]);

  useEffect(() => {
    if (isMobileResolution !== null) {
      const currentLimit = isMobileResolution
        ? deviceLimit
        : currentPage === 1 ? deviceLimit : deviceLimit + 1;

      loadNewArticles({ currentPage, currentLimit, category });
    }

    const setResize = () => (window.innerWidth < mobileResolution ? setMobileResolution(true) : setMobileResolution(false));
    setResize();
    window.addEventListener('resize', setResize);
    return () => {
      window.removeEventListener('resize', setResize);
    };
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
      <ReactPaginate
        pageCount={pagesCounter}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel={arrows.prev}
        nextLabel={arrows.next}
        containerClassName={styles.paginationContainer}
        pageClassName={styles.paginationItem}
        pageLinkClassName={styles.paginationLink}
        activeLinkClassName={styles.paginationActiveLink}
        breakClassName={styles.paginationEmptyItem}
        breakLinkClassName={styles.paginationEmptyLink}
        previousLinkClassName={styles.paginationPrev}
        nextLinkClassName={styles.paginationNext}
        disableInitialCallback
        forcePage={currentPage - 1}
        onPageChange={handleOnPageClick}
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

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  articles: selectArticles(state),
  totalCount: selectTotalCount(state),
  desktopLimit: selectDesktopLimit(state),
  mobileLimit: selectMobileLimit(state),
});

export default connect(mapStateToProps, { loadArticles, setTotalCount })(BlogContainer);
