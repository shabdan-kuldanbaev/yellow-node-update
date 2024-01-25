import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

export const ToTopButton = () => {
  const [isHidden, setIsHidden] = useState(true);
  const handleOnClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOnScroll = () => setIsHidden(window.pageYOffset < 300);

    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      className={cn(styles.toTop, { [styles.hidden]: isHidden })}
      onClick={handleOnClick}
      role="button"
      tabIndex="0"
    >
      <Svg
        type={SVG_IMAGES_TYPES.arrowNarrowUp}
        className={styles.arrowUp}
      />
    </div>
  );
};
