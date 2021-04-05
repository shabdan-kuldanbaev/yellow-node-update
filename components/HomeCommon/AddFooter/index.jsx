import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SocialIcons, ScrollIcon } from 'components';
import styles from './styles.module.scss';

export const AddFooter = ({
  theme,
  setScroll,
  isMobileMenuOpened,
  isFirstHomepageVisit,
}) => {
  let oldY = 0;
  const scrollLabel = useRef(null);
  const [direction, setDirection] = useState('');
  const [isTopOfPage, setTopOfPage] = useState(false);

  const handleOnScroll = () => {
    const { pageYOffset } = window;

    if (pageYOffset < 250) {
      setTopOfPage(true);

      if (pageYOffset < 200 && oldY > pageYOffset) setDirection('up');

      if (pageYOffset > 100 && oldY < pageYOffset) setDirection('down');
    } else setTopOfPage(false);

    oldY = pageYOffset;
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    oldY = window.pageYOffset;

    setScroll(scrollLabel.current);
    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <section className={cn(styles.addFooterContainer, styles[direction], {
      [styles.notOnTop]: !isTopOfPage,
    })}
    >
      <SocialIcons theme={theme} />
      <ScrollIcon theme={theme} />
      {!isMobileMenuOpened && !isFirstHomepageVisit && <span ref={scrollLabel} className={styles.scrollTitle}>scroll down</span>}
    </section>
  );
};

AddFooter.defaultProps = {
  theme: 'dark',
};

AddFooter.propTypes = {
  theme: PropTypes.string,
  setScroll: PropTypes.func.isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  isFirstHomepageVisit: PropTypes.bool.isRequired,
};
