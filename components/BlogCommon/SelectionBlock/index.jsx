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
import ButtonMore from 'components/Common/ButtonMore';
import FullscreenSearch from 'components/BlogCommon/FullscreenSearch';
import FullscreenSubscribe from 'components/BlogCommon/FullscreenSubscribe';
import { Svg } from 'components/Common/Svg';
import { setOverflowForBody } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import Categories from './Categories';
import styles from './styles.module.scss';

const SelectionBlock = ({
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
    <div className={cn(styles.selectionBlock, {
      [styles.showCategories]: isMobileCategoties,
    })}
    >
      <Categories
        isMobileCategoties={isMobileCategoties}
        closeMobileCategoties={closeMobileCategoties}
      />
      {isMobileCategoties && <div className={styles.darkBackground} />}
      <div className={styles.buttons}>
        <Svg
          type={SVG_IMAGES_TYPES.searchSvg}
          handleOnClick={openFullscreenSearch}
          className={styles.imgContainer}
        />
        <ButtonMore
          buttonRef={subscribeRef}
          handleOnClick={openFullscreenSubscribe}
          title="Subscribe"
          buttonStyle={styles.button}
        />
        <span
          className={styles.categoryTitleInHeader}
          onClick={openMobileCategoties}
          role="button"
          tabIndex="0"
        >
          Categories
        </span>
      </div>
      <FullscreenSearch
        isFullscreenSearch={isFullscreenSearch}
        closeFullscreenSearch={closeFullscreenSearch}
      />
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
  isMobileCategoties: PropTypes.bool.isRequired,
  setMobileCategoriesState: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func,
};

export default connect(
  (state) => ({ isMobileCategoties: selectIsMobileCategotiesOpened(state) }),
  { setMobileCategoriesState },
)(SelectionBlock);
