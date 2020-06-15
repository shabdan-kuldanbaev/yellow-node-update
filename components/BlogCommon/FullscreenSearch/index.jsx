import React, { useState, useEffect } from 'react';
import { Articles, ModalWindow } from 'components';
import PropTypes from 'prop-types';
import { articlesData } from 'containers/Blog/utils/data';
import { mobileResolution } from 'utils/helper';
import styles from './styles.module.scss';

const FullscreenSearch = ({
  isFullscreenSearch,
  closeFullscreenSearch,
  articlesData: dataOfArticle,
}) => {
  const [isMobileResolution, setMobileResolution] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const articles = dataOfArticle ? dataOfArticle.filter((item, index) => index < 10) : [];

  const handleOnChangeInput = ({ target: { value } }) => setInputValue(value);

  useEffect(() => {
    const onResize = () => (window.innerWidth < mobileResolution ? setMobileResolution(true) : setMobileResolution(false));

    onResize();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [isMobileResolution]);

  return (
    <ModalWindow
      isModalWindow={isFullscreenSearch}
      closeModalWindow={closeFullscreenSearch}
      className={styles.search}
    >
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
              isMobileResolution={isMobileResolution}
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
