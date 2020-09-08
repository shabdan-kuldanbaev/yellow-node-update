import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const TopProgressBar = ({ elementRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleOnScroll = () => {
      if (elementRef && elementRef.current) {
        const { innerHeight } = window;
        const { top, height } = elementRef.current.getBoundingClientRect();
        const position = (top * -1) / ((height - innerHeight) / 100);
        position < 100 ? setProgress(position) : setProgress(0);
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <div className={styles.topProgressBar}>
      <div
        className={styles.progress}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};


TopProgressBar.propTypes = {
  elementRef: PropTypes.instanceOf(Object).isRequired,
};
