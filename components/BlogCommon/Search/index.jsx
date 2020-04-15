import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import CloseIcon from './images/close.svg';

const Search = ({
  isSearch,
  closeSearch,
}) => {

  return (
    <section className={cn(styles.search, {[styles.show]: isSearch})}>
      <img
        onClick={closeSearch}
        src={CloseIcon}
        alt="Cloce"
      />
      <div className={styles.searchBlock}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type to search"
          autoFocus
        />
        <span className={styles.nothingFound}>
          Nothing Found. Please try again with some different keywords.
        </span>
      </div>
    </section>
  );
};

export default Search;
