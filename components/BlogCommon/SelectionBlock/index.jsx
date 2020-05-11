import React, { useState } from 'react';
import { ButtonMore } from 'components';
import cn from 'classnames';
import { useOverflowForBody } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMobileCategotiesOpened } from 'redux/selectors/layout';
import { setMobileCategoriesState } from 'redux/actions/layout';
import styles from './styles.module.scss';
import SearchIcon from './images/search.svg';
import FullscreenSearch from '../FullscreenSearch';
import FullscreenSubscribe from '../FullscreenSubscribe';
import { tags } from './utils/data';
import Categories from './Categories';

const SelectionBlock = ({ urlPath }) => {
  const [isFullscreenSearch, setFullscreenSearch] = useState(null);
  const [isFullscreenSubscribe, setFullscreenSubscribe] = useState(null);
  const openFullscreenSearch = () => setFullscreenSearch(true);
  const closeFullscreenSearch = () => setFullscreenSearch(false);
  const openFullscreenSubscribe = () => setFullscreenSubscribe(true);
  const closeFullscreenSubscribe = () => setFullscreenSubscribe(false);

  const dispatch = useDispatch();
  const isMobileCategoties = useSelector((state) => selectIsMobileCategotiesOpened(state));
  const openMobileCategoties = () => dispatch(setMobileCategoriesState(true));
  const closeMobileCategoties = () => dispatch(setMobileCategoriesState(false));

  useOverflowForBody(isMobileCategoties);

  return (
    <div className={cn(styles.selectionBlock, { [styles.showCategories]: isMobileCategoties })}>
      <Categories
        tags={tags}
        urlPath={urlPath}
        isMobileCategoties={isMobileCategoties}
        closeMobileCategoties={closeMobileCategoties}
      />
      {isMobileCategoties && <div className={styles.darkBackground} />}
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
