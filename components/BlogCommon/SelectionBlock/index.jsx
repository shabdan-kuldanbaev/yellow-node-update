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

import Svg from 'UI/components/Svg';
import { setOverflowForBody } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import Categories from './Categories';
import styles from './styles.module.scss';

const SelectionBlock = ({ toggleFullscreenSearch }) => {
  const isMobileCategoties = useSelector(selectIsMobileCategotiesOpened);

  useEffect(() => {
    setOverflowForBody(isMobileCategoties);
  }, [isMobileCategoties]);

  return (
    <div className={cn(styles.selectionBlock, {
      [styles.showCategories]: isMobileCategoties,
    })}
    >
      <Categories isMobileCategoties={isMobileCategoties} />
      <div className={styles.buttons}>
        <Svg
          type={SVG_IMAGES_TYPES.searchLg}
          handleOnClick={toggleFullscreenSearch}
          className={styles.imgContainer}
        />
      </div>
    </div>
  );
};

SelectionBlock.defaultProps = {
  toggleFullscreenSearch: () => null,
};

SelectionBlock.propTypes = {
  toggleFullscreenSearch: PropTypes.func,
};

export default SelectionBlock;
