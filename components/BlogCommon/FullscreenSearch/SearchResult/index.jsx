import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectFoundArticles, selectSearchMessage } from 'redux/selectors/blog';
import { ArticlesList } from 'components/BlogCommon/ArticlesList';
import ButtonMore from 'components/Common/ButtonMore';
import styles from './styles.module.scss';

const SearchResult = ({ searchValue, handleOnCloseModalWindow }) => {
  const foundArticles = useSelector(selectFoundArticles);
  const searchMessage = useSelector(selectSearchMessage);
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
    setArticlesChunks(chunk(foundArticles, 12));
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
        handleOnCloseModalWindow={handleOnCloseModalWindow}
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

SearchResult.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleOnCloseModalWindow: PropTypes.func.isRequired,
};

export default SearchResult;
