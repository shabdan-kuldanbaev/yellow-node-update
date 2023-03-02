import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Svg from 'UI/components/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { setOverflowForBody } from 'utils/helper';
import { selectIsMobileCategotiesOpened } from 'redux/selectors/layout';
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
