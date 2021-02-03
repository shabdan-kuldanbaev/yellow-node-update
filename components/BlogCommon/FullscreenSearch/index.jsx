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
import { selectFoundArticles } from 'redux/selectors/blog';
import { ArticlesList, ModalWindow } from 'components';
import styles from './styles.module.scss';

const FullscreenSearch = ({
  isFullscreenSearch,
  closeFullscreenSearch,
  findArticles,
  clearFoundArticles,
  foundArticles,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const delayedQuery = useCallback(debounce((value) => findArticles({ value }), 1000), []);
  const handleOnChangeInput = ({ target: { value } }) => {
    setInputValue(value);

    if (value.length > 1) delayedQuery(value);
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
        {(!inputValue || !(foundArticles && foundArticles.length))
          ? <span className={styles.nothingFound}>Nothing Found. Please try again with some different keywords.</span>
          : (
            <ArticlesList
              articles={foundArticles}
              isLoading={false}
              page={2}
              isSearch
            />
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
  foundArticles: PropTypes.instanceOf(Array).isRequired,
};

export default connect((state) => ({
  foundArticles: selectFoundArticles(state),
}), { findArticles, clearFoundArticles })(FullscreenSearch);
