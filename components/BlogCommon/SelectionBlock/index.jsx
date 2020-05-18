import React, { useState, useEffect } from 'react';
import {
  ButtonMore,
  FullscreenSearch,
  FullscreenSubscribe,
} from 'components';
import cn from 'classnames';
import { setOverflowForBody } from 'utils/helper';
import { selectIsMobileCategotiesOpened } from 'redux/selectors/layout';
import { setMobileCategoriesState } from 'redux/actions/layout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import SearchIcon from './images/search.svg';
import { tags } from './utils/data';
import Categories from './Categories';

const SelectionBlock = ({
  urlPath,
  isMobileCategoties,
  setMobileCategoriesState: setMobileCategories,
}) => {
  const [isFullscreenSearch, setFullscreenSearch] = useState(false);
  const [isFullscreenSubscribe, setFullscreenSubscribe] = useState(false);

  const openFullscreenSearch = () => setFullscreenSearch(true);
  const closeFullscreenSearch = () => setFullscreenSearch(false);
  const openFullscreenSubscribe = () => setFullscreenSubscribe(true);
  const closeFullscreenSubscribe = () => setFullscreenSubscribe(false);
  const openMobileCategoties = () => setMobileCategories(true);
  const closeMobileCategoties = () => setMobileCategories(false);

  useEffect(() => {
    setOverflowForBody(isMobileCategoties);
  }, [isMobileCategoties]);

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

SelectionBlock.propTypes = {
  urlPath: PropTypes.string.isRequired,
  isMobileCategoties: PropTypes.bool.isRequired,
  setMobileCategoriesState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isMobileCategoties: selectIsMobileCategotiesOpened(state) });

export default connect(mapStateToProps, { setMobileCategoriesState })(SelectionBlock);
