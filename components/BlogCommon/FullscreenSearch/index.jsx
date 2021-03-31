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
  findArticles,
  clearFoundArticles,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const delayedQuery = useCallback(debounce((value) => findArticles({ value }), 1000), []);
  const handleOnChangeInput = ({ target: { value } }) => {
    setInputValue(value);

    if (value.length > 1) delayedQuery(value);
    if (value.length <= 1) {
      clearFoundArticles();
    }
  };
  const handleOnCloseModalWindow = () => {
    closeFullscreenSearch();
    setInputValue('');
    clearFoundArticles();
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
        {inputValue
          ? <SearchResult />
          : <span className={styles.nothingFound}>Type some words to search.</span>}
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
