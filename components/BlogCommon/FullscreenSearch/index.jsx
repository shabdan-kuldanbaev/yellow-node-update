import {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import ModalWindow from 'components/Common/ModalWindow';
import { getArticleSearchResult } from 'utils/dataFetching/getArticleSearchResult';
import SearchResult from './SearchResult';
import styles from './styles.module.scss';

const FullscreenSearch = ({
  closeFullscreenSearch,
  isFullscreenSearch = false,
}) => {
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState(inputValue);
  const { data: articles = [], isFetching } = getArticleSearchResult(searchTerm);

  const delayedQuery = useMemo(
    () => debounce((value) => setSearchTerm(value), 1000),
    [],
  );

  const handleOnChangeInput = ({ target: { value } }) => {
    setInputValue(value);
    delayedQuery(value);
  };

  const handleOnCloseModalWindow = () => {
    closeFullscreenSearch();
    setInputValue('');
    setSearchTerm('');
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
    >
      <div className={styles.foundArticles}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Type to search"
          onChange={handleOnChangeInput}
          value={inputValue}
        />
        {searchTerm.length
          ? (
            <SearchResult
              foundArticles={articles}
              isFetching={isFetching}
              handleOnCloseModalWindow={handleOnCloseModalWindow}
            />
          )
          : (
            <span className={styles.nothingFound}>
              Type some words to search.
            </span>
          )}
      </div>
    </ModalWindow>
  );
};

FullscreenSearch.propTypes = {
  isFullscreenSearch: PropTypes.bool,
  closeFullscreenSearch: PropTypes.func.isRequired,
};

export default memo(FullscreenSearch);
