import React, { useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { articles } from './utils/data';

import styles from './styles.module.scss';

const GridArticles = () => {
  const [isAnimated, setAnimated] = useState('');
  const articlesGrid = useRef(null);
  const gridClassName = cn({
    [`${styles.articlesGrid}`]: true,
    [`${styles.animate}`]: isAnimated,
  });

  const handleOnScroll = () => {
    if (articlesGrid.current.getBoundingClientRect().top < window.innerHeight) {
      setAnimated(true);
    };
  }

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <div className={gridClassName} ref={articlesGrid}>
      {articles.map(art => (
        art.priority === 'low'
          ? (
            <div key={`articles/${art.id}`} className={styles[art.priority]}>
              <div className={styles.imgContainer}>
                <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
              </div>
              <span className={styles.title}>{art.title}</span>
              <span className={styles.publishedDate}>{art.publishedDate}</span>
            </div>
          )
          : (
            <div key={`articles/${art.id}`} className={styles[art.priority]}>
              <div className={styles.overlay} />
              <div className={styles.imgContainer}>
                <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
              </div>
              <div className={styles.desc}>
                <span className={styles.title}>{art.title}</span>
                <span className={styles.publishedDate}>{art.publishedDate}</span>
              </div>
            </div>
          )
        ))}
    </div>
  );
};

export default GridArticles;
