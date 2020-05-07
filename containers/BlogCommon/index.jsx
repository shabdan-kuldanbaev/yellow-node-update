import React, { useEffect, useState } from 'react';
import { SelectionBlock, Articles } from 'components/BlogCommon';
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
import { loadArticles, setTotalCount } from 'redux/actions/blog';
import { articlesData, arrows } from './utils/data';
import styles from './styles.module.scss';

const BlogCommon = ({
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
  const [isMobileResolution, setMobileResolution] = useState(null);
  const deviceLimit = isMobileResolution ? mobileLimit : desktopLimit;
  const pagesCounter = Math.ceil(totalCount / (isMobileResolution ? deviceLimit : (deviceLimit + 1)));
  const currentPage = parseInt(page);

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
    window.innerWidth < mobileResolution
      ? setMobileResolution(true)
      : setMobileResolution(false);

    const newArticles = category !== 'latest'
      ? articlesData.filter((article) => article.category === category)
      : articlesData;
    setTotalArticlesCount(newArticles.length);
  }, []);

  useEffect(() => {
    if (isMobileResolution !== null) {
      const currentLimit = isMobileResolution
        ? deviceLimit
        : toInt(page) === 1 ? deviceLimit : deviceLimit + 1;
      loadNewArticles({ currentPage, currentLimit, category });
    }
  }, [isMobileResolution]);

  // TODO console.log('BlogCommon: ', {
  //   introSection,
  //   articles,
  //   isLoading,
  //   loadPosts: loadNewArticles,
  //   setTotalCount: setTotalArticlesCount,
  //   totalCount,
  //   desktopLimit,
  //   mobileLimit,
  //   pathname,
  //   asPath,
  //   category,
  //   page,
  //   pagesCounter,
  //   isMobileResolution,
  // });

  return (
    <section ref={introSection} className={styles.blog}>
      {!isMobileResolution && <SelectionBlock urlPath={asPath} />}
      <Articles
        articles={articles}
        isLoading={isLoading}
        page={page}
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
        initialPage={currentPage - 1}
        onPageChange={handleOnPageClick}
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  articles: selectArticles(state),
  totalCount: selectTotalCount(state),
  desktopLimit: selectDesktopLimit(state),
  mobileLimit: selectMobileLimit(state),
});

export default connect(mapStateToProps, { loadArticles, setTotalCount })(BlogCommon);
