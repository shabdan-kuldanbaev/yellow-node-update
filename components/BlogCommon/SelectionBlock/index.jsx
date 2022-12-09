import React, {
  useEffect,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMobileCategotiesOpened } from 'redux/selectors/layout';
import { setMobileCategoriesState } from 'redux/actions/layout';
import ButtonMore from 'components/Common/ButtonMore';
import FullscreenSearch from 'components/BlogCommon/FullscreenSearch';
import FullscreenSubscribe from 'components/BlogCommon/FullscreenSubscribe';
import Svg from 'UI/components/Svg';
import useToggle from 'hooks/useToggle';
import { setOverflowForBody } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import Categories from './Categories';
import styles from './styles.module.scss';

const SelectionBlock = ({ handleOnSubmit }) => {
  const dispatch = useDispatch();
  const isMobileCategoties = useSelector(selectIsMobileCategotiesOpened);
  const [isFullscreenSearch, toggleFullscreenSearch] = useToggle(false);
  const [isFullscreenSubscribe, toggleFullscreenSubscribe] = useToggle(false);
  const subscribeRef = useRef(null);

  const handleMobileCategoties = useCallback((state) => () => {
    dispatch(setMobileCategoriesState(state));
  }, [dispatch]);

  useEffect(() => {
    setOverflowForBody(isMobileCategoties);
  }, [isMobileCategoties]);

  return (
    <div className={cn(styles.selectionBlock, {
      [styles.showCategories]: isMobileCategoties,
    })}
    >
      <Categories isMobileCategoties={isMobileCategoties} />
      {isMobileCategoties && <div className={styles.darkBackground} />}
      <div className={styles.buttons}>
        <Svg
          type={SVG_IMAGES_TYPES.searchLg}
          handleOnClick={toggleFullscreenSearch}
          className={styles.imgContainer}
        />
        <ButtonMore
          buttonRef={subscribeRef}
          handleOnClick={toggleFullscreenSubscribe}
          title="Subscribe"
          buttonStyle={styles.button}
        />
        <span
          className={styles.categoryTitleInHeader}
          onClick={handleMobileCategoties(true)}
          role="button"
          tabIndex="0"
        >
          Categories
        </span>
      </div>
      <FullscreenSearch
        isFullscreenSearch={isFullscreenSearch}
        closeFullscreenSearch={toggleFullscreenSearch}
      />
      <FullscreenSubscribe
        isFullscreenSubscribe={isFullscreenSubscribe}
        closeFullscreenSubscribe={toggleFullscreenSubscribe}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};

SelectionBlock.defaultProps = {
  handleOnSubmit: () => null,
};

SelectionBlock.propTypes = {
  handleOnSubmit: PropTypes.func,
};

export default SelectionBlock;
