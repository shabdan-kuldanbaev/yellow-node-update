import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileCategotiesOpened } from 'redux/selectors/layout';
import { setMobileCategoriesState } from 'redux/actions/layout';
import {
  ButtonMore,
  FullscreenSearch,
  FullscreenSubscribe,
} from 'components';
import { setOverflowForBody, getPathWithCdn } from 'utils/helper';
import { STATIC_IMAGES } from 'utils/constants';
import Categories from './Categories';
import styles from './styles.module.scss';

const SelectionBlock = ({
  urlPath,
  isMobileCategoties,
  setMobileCategoriesState: setMobileCategories,
  handleOnSubmit,
}) => {
  const [isFullscreenSearch, setFullscreenSearch] = useState(false);
  const [isFullscreenSubscribe, setFullscreenSubscribe] = useState(false);
  const subscribeRef = useRef(null);

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
        urlPath={urlPath}
        isMobileCategoties={isMobileCategoties}
        closeMobileCategoties={closeMobileCategoties}
      />
      {isMobileCategoties && <div className={styles.darkBackground} />}
      <div className={styles.buttons}>
        <div className={styles.imgContainer}>
          <img
            src={getPathWithCdn(STATIC_IMAGES.searchIcon)}
            alt="Search"
            onClick={openFullscreenSearch}
            role="presentation"
          />
        </div>
        <ButtonMore
          buttonRef={subscribeRef}
          handleOnClick={openFullscreenSubscribe}
          title="Subscribe"
          buttonStyle={styles.button}
        />
        <span className={styles.categoryTitleInHeader} onClick={openMobileCategoties}>
          Categories
        </span>
      </div>
      <FullscreenSearch isFullscreenSearch={isFullscreenSearch} closeFullscreenSearch={closeFullscreenSearch} />
      <FullscreenSubscribe
        isFullscreenSubscribe={isFullscreenSubscribe}
        closeFullscreenSubscribe={closeFullscreenSubscribe}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};

SelectionBlock.defaultProps = {
  handleOnSubmit: () => {},
};

SelectionBlock.propTypes = {
  urlPath: PropTypes.string.isRequired,
  isMobileCategoties: PropTypes.bool.isRequired,
  setMobileCategoriesState: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func,
};

export default connect(
  (state) => ({ isMobileCategoties: selectIsMobileCategotiesOpened(state) }),
  { setMobileCategoriesState },
)(SelectionBlock);
