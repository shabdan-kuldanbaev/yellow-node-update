import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

export const ToTopButton = () => {
  const [isHidden, setIsHidden] = useState(true);
  const handleOnClick = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  useEffect(() => {
    const handleOnScroll = () => {
      const { pageYOffset } = window;

      if (pageYOffset < 300) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <div
      className={cn(styles.toTop, { [styles.hidden]: isHidden })}
      onClick={handleOnClick}
      role="button"
      tabIndex="0"
    >
      <Svg
        type={SVG_IMAGES_TYPES.arrowUp}
        className={styles.arrowUp}
      />
    </div>
  );
};
