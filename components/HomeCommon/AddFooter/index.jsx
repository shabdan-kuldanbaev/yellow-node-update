import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SocialIcons from '../SocialIcons';
import ScrollIcon from '../ScrollIcon';
import styles from './styles.module.scss';

const AddFooter = ({
  theme,
  setScroll,
  isModelLoaded,
  isMobileMenuOpened,
}) => {
  let oldY = 0;
  const scrollLabel = useRef(null);
  const [direction, setDirection] = useState('');
  const [isTopOfPage, setTopOfPage] = useState(false);
  const footerClassName = cn({
    [`${styles.addFooterContainer}`]: true,
    [`${styles[direction]}`]: true,
    [`${styles.animate}`]: isModelLoaded,
    [`${styles.notOnTop}`]: !isTopOfPage,
  });

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
    oldY = window.pageYOffset;
    handleOnScroll();
    setScroll(scrollLabel.current);

    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <section className={footerClassName}>
      <SocialIcons theme={theme} />
      <ScrollIcon theme={theme} />
      {!isMobileMenuOpened && <span ref={scrollLabel} className={styles.scrollTitle}>scroll down</span>}
    </section>
  );
};

AddFooter.defaultProps = {
  theme: 'dark',
};

AddFooter.propTypes = {
  theme: PropTypes.string,
  setScroll: PropTypes.func.isRequired,
  isModelLoaded: PropTypes.bool.isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
};

export default AddFooter;
