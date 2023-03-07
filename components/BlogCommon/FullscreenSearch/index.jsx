import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';
import { searchCleared, searchStarted } from 'redux/reducers/blog';
import ModalWindow from 'components/Common/ModalWindow';
import SearchResult from './SearchResult';
import styles from './styles.module.scss';

const FullscreenSearch = ({ isFullscreenSearch, closeFullscreenSearch }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(debounce((value) => dispatch(searchStarted({ value })), 1000), []);
  const handleOnChangeInput = ({ target: { value } }) => {
    setInputValue(value);

    if (value.length === 0) {
      dispatch(searchCleared());
      delayedQuery.cancel();
    }

    if (value.length > 1) {
      delayedQuery(value);
    }
  };
  const handleOnCloseModalWindow = () => {
    closeFullscreenSearch();
    setInputValue('');
    dispatch(searchCleared());
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
};

export default React.memo(FullscreenSearch);
