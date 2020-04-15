import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ButtonMore } from 'components';
import SearchIcon from './images/search.svg';
import FullscreenSearch from '../FullscreenSearch';
import FullscreenSubscribe from '../FullscreenSubscribe';
import cn from 'classnames';
import { tags } from './utils/data';
import Categories from './Categories';

const SelectionBlock = ({ urlPath }) => {
  const [isFullscreenSearch, setFullscreenSearch] = useState(null);
  const [isFullscreenSubscribe, setFullscreenSubscribe] = useState(null);
  const [isMobileCategoties, setMobileCategoties] = useState(null);
  const openFullscreenSearch = () => setFullscreenSearch(true);
  const closeFullscreenSearch = () => setFullscreenSearch(false);
  const openFullscreenSubscribe = () => setFullscreenSubscribe(true);
  const closeFullscreenSubscribe = () => setFullscreenSubscribe(false);
  const openMobileCategoties = () => setMobileCategoties(true);
  const closeMobileCategoties = () => setMobileCategoties(false);

  return (
    <div className={cn(styles.selectionBlock, {[styles.showCategories]: isMobileCategoties})}>
      <Categories
        tags={tags}
        urlPath={urlPath}
        isMobileCategoties={isMobileCategoties}
        closeMobileCategoties={closeMobileCategoties}
      />
      <div className={styles.buttons}>
        <img
          src={SearchIcon}
          alt="Search"
          onClick={openFullscreenSearch}
        />
        <ButtonMore
          handleOnClick={openFullscreenSubscribe}
          title="Subscribe"
          buttonStyle={styles.button}
        />
        <span className={styles.categoryTitleInHeader} onClick={openMobileCategoties}>Categories</span>
      </div>
      <FullscreenSearch isFullscreenSearch={isFullscreenSearch} closeFullscreenSearch={closeFullscreenSearch} />
      <FullscreenSubscribe isFullscreenSubscribe={isFullscreenSubscribe} closeFullscreenSubscribe={closeFullscreenSubscribe} />
    </div>
  );
};

export default SelectionBlock;
