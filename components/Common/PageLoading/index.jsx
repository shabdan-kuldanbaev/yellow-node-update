import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { setOverflowForBody } from 'utils/helper';
import styles from './styles.module.scss';

export const PageLoading = ({
  isLoading,
  handleOnBlogLoad,
  asPath,
}) => {
  const [isPageLoaded, setPageLoaded] = useState(true);
  const loadRef = useRef(null);

  useEffect(() => {
    if (!isPageLoaded) setTimeout(() => setPageLoaded(true), 500);

    return () => {
      setPageLoaded(false);
      loadRef.current && loadRef.current.classList.remove(styles.hide);
      loadRef.current && loadRef.current.classList.remove(styles.setZIndex);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isPageLoaded && isLoading) {
      loadRef.current && loadRef.current.classList.add(styles.hide);

      setTimeout(() => {
        loadRef.current && loadRef.current.classList.add(styles.setZIndex);
        setOverflowForBody(false);
        if (asPath.includes('blog')) handleOnBlogLoad(true);
      }, 500);
    } else setOverflowForBody(true);
  }, [isPageLoaded, isLoading]);

  return (
    <div ref={loadRef} className={styles.pageLoading}>
      <p>Yellow</p>
    </div>
  );
};

PageLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleOnBlogLoad: PropTypes.func.isRequired,
  asPath: PropTypes.string.isRequired,
};
