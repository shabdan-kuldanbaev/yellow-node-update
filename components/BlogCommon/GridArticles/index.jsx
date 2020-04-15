import React, {
  useRef,
  useEffect,
  useState,
  Fragment,
} from 'react';
import cn from 'classnames';
import Subscribe from '../Subscribe';
import { mobileResolution, toInt } from 'utils/helper';
import styles from './styles.module.scss';
import { LinkWrapper, Loader } from 'components';
import PropTypes from 'prop-types';

const GridArticles = ({
  articles,
  isLoading,
  page,
}) => {
  const [isAnimated, setAnimated] = useState('');
  const [isMobile, setMobile] = useState(false);
  const articlesGrid = useRef(null);
  const gridClassName = cn({
    [`${styles.articlesGrid}`]: true,
    [`${styles.animate}`]: isAnimated,
  });

  // const handleOnScroll = () => {
  //   if (articlesGrid.current.getBoundingClientRect().top < window.innerHeight) {
  //     console.log(articlesGrid.current.getBoundingClientRect().top);
  //     setAnimated(true);
  //   };
  // }

  useEffect(() => {
    if (articlesGrid.current.getBoundingClientRect().top < window.innerHeight) {
      setAnimated(true);
    }
    if (window.innerWidth < mobileResolution) {
      setMobile(m => !m);
    } 

    // window.addEventListener('scroll', handleOnScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleOnScroll);
    // };
  }, []);

  return (
    <div className={gridClassName} ref={articlesGrid}>
      <Loader isLoading={!isLoading}>
        {articles && articles.map((art, index) => (
          <Fragment>
            {isMobile
              ? index === 3 && <Subscribe isMobile={isMobile} />
              : toInt(page) === 1
                ? index === 8 && <Subscribe isMobile={isMobile} />
                : index === 9 && <Subscribe isMobile={isMobile} />
            }
            <div key={`articles/${art.id}`} className={cn({
              [styles.high]: index === 0 && toInt(page) === 1,
              [styles.medium]: index === 1 && toInt(page) === 1,
              [styles.low]: (toInt(page) === 1 && index !== 0 && index !== 1) || toInt(page) !== 1,
            })}>
              <LinkWrapper
                isLocalLink
                dynamicRouting="/blog/[post]"
                path={`/blog/${art.slug}`}
              >
                {!isMobile && toInt(page) === 1 && (index === 0 || index === 1) && <div className={styles.overlay} />}
                <div className={styles.imgContainer}>
                  <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
                </div>
                <div className={styles.desc}>
                  {isMobile
                    ? <span className={styles.publishedDate}>{art.category} - {art.id}</span>
                    : <span className={styles.title}>{art.title}</span>
                  }
                  {isMobile
                    ? <span className={styles.title}>{art.title}</span>
                    : <span className={styles.publishedDate}>{art.category} - {art.id}</span>
                  }
                  {isMobile
                    ? <p className={styles.description}>{art.description}</p>
                    : toInt(page) !== 1
                      ? <p className={styles.description}>{art.description}</p>
                      : index !== 0 && index !== 1 && <p className={styles.description}>{art.description}</p>
                  }
                </div>
              </LinkWrapper>
            </div>
          </Fragment>
        ))}
      </Loader>
    </div>
  );
};

GridArticles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};

export default GridArticles;
