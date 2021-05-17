import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { findArticles, clearFoundArticles } from 'redux/actions/blog';
import { ModalWindow } from 'components';
import SearchResult from './SearchResult';
import styles from './styles.module.scss';

const FullscreenSearch = ({
  isFullscreenSearch,
  closeFullscreenSearch,
  findArticles: loadArticles,
  clearFoundArticles: removeFoundArticles,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(debounce((value) => loadArticles({ value }), 1000), []);
  const handleOnChangeInput = ({ target: { value } }) => {
    setInputValue(value);

    if (value.length === 0) {
      removeFoundArticles();
      delayedQuery.cancel();
    }

    if (value.length > 1) {
      delayedQuery(value);
    }
  };
  const handleOnCloseModalWindow = () => {
    closeFullscreenSearch();
    setInputValue('');
    removeFoundArticles();
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
        {inputValue.length > 1
          ? (
            <SearchResult
              searchValue={inputValue}
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

FullscreenSearch.defaultProps = {
  isFullscreenSearch: false,
};

FullscreenSearch.propTypes = {
  isFullscreenSearch: PropTypes.bool,
  closeFullscreenSearch: PropTypes.func.isRequired,
  findArticles: PropTypes.func.isRequired,
  clearFoundArticles: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    findArticles,
    clearFoundArticles,
  },
)(FullscreenSearch);
