import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { TestSVG } from './TestSVG';

const PageLoading = ({
  isLoading,
  handleOnBlogLoad,
  asPath,
}) => {
  const [isPageLoaded, setPageLoaded] = useState(true);
  const loadRef = useRef(null);

  const asyncTimeout = (time) => new Promise((res) => setTimeout(() => res(), time));

  useEffect(() => {
    if (!isPageLoaded) asyncTimeout(500).then(() => setPageLoaded(true));

    return () => {
      setPageLoaded(false);
      loadRef.current && loadRef.current.classList.remove(styles.hide);
      loadRef.current && loadRef.current.classList.remove(styles.setZIndex);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isPageLoaded && isLoading) {
      loadRef.current && loadRef.current.classList.add(styles.hide);
      asyncTimeout(500).then(() => {
        loadRef.current && loadRef.current.classList.add(styles.setZIndex);
        if (asPath.includes('blog')) handleOnBlogLoad(true);
      });
    }
  }, [isPageLoaded, isLoading]);

  return (
    <div ref={loadRef} className={styles.pageLoading}>
      <TestSVG />
    </div>
  );
};

PageLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleOnBlogLoad: PropTypes.func.isRequired,
  asPath: PropTypes.string.isRequired,
};

export default PageLoading;
