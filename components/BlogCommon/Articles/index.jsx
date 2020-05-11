import React, {
  useRef,
  useEffect,
  useState,
  Fragment,
} from 'react';
import cn from 'classnames';
import { mobileResolution, toInt } from 'utils/helper';
import { LinkWrapper, Loader } from 'components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import Subscribe from '../Subscribe';

const Articles = ({
  articles,
  isLoading,
  page,
}) => {
  const { asPath } = useRouter();
  const [isMobile, setMobile] = useState(false);
  const articlesGrid = useRef(null);
  const pageNumber = toInt(page);

  useEffect(() => {
    window.innerWidth < mobileResolution
      ? setMobile(true)
      : setMobile(false);
  }, []);

  return (
    <div className={styles.articlesGrid} ref={articlesGrid}>
      <Loader isLoading={!isLoading}>
        {articles && articles.map((art, index) => (
          <Fragment>
            {/* TODO first variant */}
            {/* {isMobile
              ? index === 3 && <Subscribe isMobile={isMobile} />
              : pageNumber === 1
                ? index === 8 && <Subscribe isMobile={isMobile} />
                : index === 9 && <Subscribe isMobile={isMobile} />
            } */}
            {/* second variant */}
            {pageNumber === 1 && (isMobile
              ? (index === 3 && <Subscribe isMobile={isMobile} />)
              : (index === 8 && <Subscribe isMobile={isMobile} />))}
            <div
              key={`articles/${art.id}`}
              className={cn({
                [styles.high]: index === 0 && pageNumber === 1,
                [styles.medium]: index === 1 && pageNumber === 1,
                [styles.low]: (pageNumber === 1 && index !== 0 && index !== 1) || pageNumber !== 1,
              })}
            >
              <LinkWrapper
                isLocalLink
                dynamicRouting="/blog/[article]"
                path={`/blog/${art.slug}`}
              >
                {!isMobile && pageNumber === 1 && (index === 0 || index === 1) && <div className={styles.overlay} />}
                <div className={styles.imgContainer}>
                  <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
                </div>
                <div className={styles.desc}>
                  { !isMobile && (index === 0 || index === 1) && pageNumber === 1
                    ? (
                      <Fragment>
                        <span className={styles.title}>{art.title}</span>
                        <span className={styles.publishedDate}>{art.category}</span>
                      </Fragment>
                    )
                    : (
                      <Fragment>
                        <span className={styles.publishedDate}>{art.category}</span>
                        <span className={styles.title}>{art.title}</span>
                      </Fragment>
                    )}
                  {/* TODO {isMobile
                    ? <span className={styles.publishedDate}>{art.category} - {art.id}</span>
                    : <span className={styles.title}>{art.title}</span>
                  }
                  {isMobile
                    ? <span className={styles.title}>{art.title}</span>
                    : <span className={styles.publishedDate}>{art.category} - {art.id}</span>
                  } */}
                  {isMobile
                    ? <p className={styles.description}>{art.description}</p>
                    : pageNumber !== 1
                      ? <p className={styles.description}>{art.description}</p>
                      : index !== 0 && index !== 1 && asPath.length !== 1 && <p className={styles.description}>{art.description}</p>}
                </div>
              </LinkWrapper>
            </div>
          </Fragment>
        ))}
      </Loader>
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
};

export default Articles;
