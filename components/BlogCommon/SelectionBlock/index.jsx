import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsMobileCategotiesOpened } from 'store/selectors/layout';
import { setOverflowForBody } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import Categories from './Categories';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const SelectionBlock = ({ toggleFullscreenSearch = () => null }) => {
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

SelectionBlock.propTypes = {
  toggleFullscreenSearch: PropTypes.func,
};

export default SelectionBlock;
