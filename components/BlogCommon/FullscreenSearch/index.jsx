import React, { useState } from 'react';
import cn from 'classnames';
import { useOverflowForBody } from 'hooks';
import { Articles } from 'components';
import PropTypes from 'prop-types';
import { articlesData } from 'containers/BlogCommon/utils/data'; // TODO
import styles from './styles.module.scss';
import CloseIcon from './images/close.svg';

const FullscreenSearch = ({
  isFullscreenSearch,
  closeFullscreenSearch,
  articlesData,
}) => {
  const [inputValue, setInputValue] = useState('');
  const articles = articlesData ? articlesData.filter((item, index) => index < 10) : [];

  const handleOnChangeInput = ({ target: { value } }) => setInputValue(value);

  useOverflowForBody(isFullscreenSearch);

  return (
    <section className={cn(styles.search, { [styles.show]: isFullscreenSearch })}>
      <img
        onClick={closeFullscreenSearch}
        src={CloseIcon}
        alt="Cloce"
      />
      <div className={styles.searchBlock}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type to search"
          autoFocus
          onChange={handleOnChangeInput}
          value={inputValue}
        />
      </div>
      <div className={styles.foundArticles}>
        {!inputValue ? <span className={styles.nothingFound}>Nothing Found. Please try again with some different keywords.</span>
          : (
            <Articles
              articles={articles}
              isLoading={false}
              page={2}
              isSearch
            />
          )}
      </div>
    </section>
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
