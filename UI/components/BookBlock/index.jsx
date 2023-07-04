import React from 'react';
import dynamic from 'next/dynamic';
import { SVG_IMAGES_TYPES, ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

import useBookBlock from './utils/useBookBlock';
import CallToAction from '../CallToAction';

const Svg = dynamic(() => import('UI/components/Svg'));

const BookBlock = (props) => {
  const {
    blockProps,
    ctaProps,
    handleClose,
    buttonShow,
  } = useBookBlock(props);

  return (
    <div {...blockProps}>
      <div className={styles.blockWrapper}>
        <CallToAction
          {...ctaProps}
          className={styles.cta}
        />
        {buttonShow && (
          <Svg
            className={styles.closeIcon}
            type={SVG_IMAGES_TYPES.closeSvg}
            handleOnClick={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default BookBlock;
