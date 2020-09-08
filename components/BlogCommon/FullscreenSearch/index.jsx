import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { ArticlesList, ModalWindow } from 'components';
import { articlesData } from 'containers/Blog/utils/data';
import styles from './styles.module.scss';

const FullscreenSearch = ({
  isFullscreenSearch,
  closeFullscreenSearch,
  articlesData: dataOfArticle,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const articles = dataOfArticle ? dataOfArticle.filter((item, index) => index < 10) : [];

  const handleOnChangeInput = ({ target: { value } }) => setInputValue(value);
  const handleOnCloseModalWindow = () => {
    closeFullscreenSearch();
    setInputValue('');
  };

  useEffect(() => {
    if (isFullscreenSearch && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFullscreenSearch]);

  return (
    <ModalWindow
      isModalWindow={isFullscreenSearch}
      closeModalWindow={handleOnCloseModalWindow}
      className={styles.search}
    >
      <div className={styles.searchBlock}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Type to search"
          onChange={handleOnChangeInput}
          value={inputValue}
        />
      </div>
      <div className={styles.foundArticles}>
        {!inputValue ? <span className={styles.nothingFound}>Nothing Found. Please try again with some different keywords.</span>
          : (
            <ArticlesList
              articles={articles}
              isLoading={false}
              page={2}
              isSearch
              asPath=""
            />
          )}
      </div>
    </ModalWindow>
  );
};

FullscreenSearch.defaultProps = {
  isFullscreenSearch: false,
  articlesData,
};

FullscreenSearch.propTypes = {
  isFullscreenSearch: PropTypes.bool,
  closeFullscreenSearch: PropTypes.func.isRequired,
  articlesData: PropTypes.instanceOf(Array),
};

export default FullscreenSearch;
