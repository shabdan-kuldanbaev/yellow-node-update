import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import chunkCreator from 'lodash/chunk';
import cn from 'classnames';
import { ArticlesList } from 'components/BlogCommon/ArticlesList';
import ButtonMore from 'components/Common/ButtonMore';
import styles from './styles.module.scss';

const SearchResult = ({
  foundArticles,
  isFetching,
  handleOnCloseModalWindow,
}) => {
  const [articlesChunks, setArticlesChunks] = useState([]);
  const [articles, setArticles] = useState([]);

  const handleOnButtonClick = () => {
    const shiftedChunks = [...articlesChunks];
    const chunk = shiftedChunks.shift();

    setArticlesChunks(shiftedChunks);
    setArticles((prev) => [...prev, ...chunk]);
  };

  useEffect(() => {
    if (!foundArticles.length) {
      return;
    }

    const chunks = chunkCreator(foundArticles, 12);

    setArticlesChunks(chunks);
    setArticles(chunks.shift());
  }, [foundArticles]);

  if (!articles.length && !isFetching) {
    return (
      <span className={styles.nothingFound}>
        Nothing Found. Please try again with some different keywords.
      </span>
    );
  }

  return (
    <div className={styles.container}>
      <ArticlesList
        articles={articles}
        handleOnCloseModalWindow={handleOnCloseModalWindow}
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

SearchResult.propTypes = {
  foundArticles: PropTypes.arrayOf(Object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleOnCloseModalWindow: PropTypes.func.isRequired,
};

export default SearchResult;
