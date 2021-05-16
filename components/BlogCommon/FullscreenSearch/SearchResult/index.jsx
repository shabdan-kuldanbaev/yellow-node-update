import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectFoundArticles, selectSearchMessage } from 'redux/selectors/blog';
import { ArticlesList, ButtonMore } from 'components';
import styles from './styles.module.scss';

const SearchResult = ({
  foundArticles,
  searchMessage,
  searchValue,
}) => {
  const [articlesChunks, setArticlesChunks] = useState([]);
  const [currectPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);

  const handleOnButtonClick = () => {
    setCurrentPage(currectPage + 1);
  };

  useEffect(() => {
    const nextChunk = articlesChunks[currectPage];

    if (nextChunk) {
      setArticles([...articles, ...nextChunk]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currectPage]);

  useEffect(() => {
    if (articlesChunks.length) {
      setArticles(articlesChunks[0]);
    }
  }, [articlesChunks]);

  useEffect(() => {
    setArticlesChunks(chunk(foundArticles, 11));
  }, [foundArticles]);

  if (!articles.length) {
    return (
      <span className={styles.nothingFound}>
        {searchMessage}
      </span>
    );
  }

  return (
    <div className={styles.container}>
      <ArticlesList
        key={searchValue}
        articles={articles}
        currentPage={2}
        isSearch
      />
      <ButtonMore
        title="Load more"
        buttonStyle={cn(styles.button, {
          [styles.hideButton]: foundArticles.length === articles.length,
        })}
        handleOnClick={handleOnButtonClick}
      />
    </div>
  );
};

SearchResult.defaultProps = {
  foundArticles: [],
};

SearchResult.propTypes = {
  foundArticles: PropTypes.instanceOf(Array),
  searchMessage: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    foundArticles: selectFoundArticles(state),
    searchMessage: selectSearchMessage(state),
  }),
)(SearchResult);
