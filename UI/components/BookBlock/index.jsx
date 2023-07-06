import React from 'react';
import dynamic from 'next/dynamic';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import CallToAction from 'UI/components/CallToAction';
import { useBookBlock } from './utils/useBookBlock';
import styles from './styles.module.scss';

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
        <Svg
          className={styles.bookIcon}
          type={SVG_IMAGES_TYPES.bookOpenFilled}
        />
        <CallToAction
          className={styles.cta}
          {...ctaProps}
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
