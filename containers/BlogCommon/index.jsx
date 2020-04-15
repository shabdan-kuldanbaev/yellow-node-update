import React, { useEffect, useState } from 'react';
import { LineOfSelect, GridArticles } from 'components/BlogCommon';
import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';
import { articlesData, arrows } from './utils/data';
import { mobileResolution, toInt } from 'utils/helper';
import Router, { useRouter } from 'next/router';
import {
  selectIsLoading,
  selectPosts,
  selectTotalCount,
  selectLimit,
} from 'redux/selectors/blog';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  loadPosts,
  setTotalCount,
  setLimit,
} from 'redux/actions/blog';

const BlogCommon = ({
  articles,
  isLoading,
  loadPosts: loadNewPosts,
  setTotalCount: setTotalArticlesCount,
  totalCount,
  setLimit: setCurrentLimit,
  limit,
}) => {
  const [isMobile, setMobile] = useState(false);
  const { pathname, query: { category, page }, asPath } = useRouter();
  const currentPage = parseInt(page) - 1;

  let pagesCounter = Math.ceil(totalCount / (limit + 1) );
  // console.log('totalCount ', totalCount, '; limit: ', limit, '; pagesCounter ', pagesCounter);
  let pageRangeDisplayed = isMobile ? 2 : 4;
  

  const handleOnPageClick = ({ selected }) => {
    window.scrollTo(0, 0);
    Router.push({
      pathname: pathname,
      query: {
        category: category,
        page: selected + 1,
      },
    });
  };

  useEffect(() => {
    const newArticles = category !== 'latest'
      ? articlesData.filter(article => article.category === category)
      : articlesData;
    // console.log('newArticles.length - ', newArticles.length);

    setTotalArticlesCount(newArticles.length);
    if (window.innerWidth < mobileResolution) {
      setMobile(m => !m);
      setCurrentLimit(4);
    }
    let currentLimit = toInt(page) === 1 ? limit : limit + 1;
    loadNewPosts({ page, currentLimit, category });
  }, [])

  return (
    <section className={styles.blog}>
      <LineOfSelect urlPath={asPath} />
      <GridArticles
        articles={articles}
        isLoading={isLoading}
        page={page}
      />
      <ReactPaginate
        pageCount={pagesCounter}
        pageRangeDisplayed={pageRangeDisplayed}
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
        disableInitialCallback={true}
        initialPage={currentPage}
        onPageChange={handleOnPageClick}
      />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  articles: selectPosts(),
  totalCount: selectTotalCount(),
  limit: selectLimit(),
});

export default connect(mapStateToProps, {
  loadPosts,
  setTotalCount,
  setLimit,
})(BlogCommon);
