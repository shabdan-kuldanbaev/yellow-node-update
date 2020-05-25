import React, {
  useRef,
  useEffect,
  useState,
  Fragment,
} from 'react';
import cn from 'classnames';
import { mobileResolution, toInt } from 'utils/helper';
import {
  LinkWrapper,
  Loader,
  Animated,
  Subscribe,
} from 'components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const Articles = ({
  articles,
  isLoading,
  page,
  isSearch,
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
        {articles && articles.map((art, index) => {
          const delay = 80 * index;
          const effect = 'fadeInUp';
          // (
            // pageNumber === 1
            //   ? (index === 0 || index === 1)
            //     ? 'zoomIn'
            //     : 'fadeInUp'
            //   : 'fadeInUp'
          // || (asPath.includes('=how-we-work') && (index === 0 ? 'bounceIn' : ' jackInTheBox'))
          // || (asPath.includes('=software-development') && (index === 0 ? 'slideInUp' : 'flipInX'))
          // || (asPath.includes('=software-chat') && (index === 0 ? 'fadeInUp' : 'bounceIn'))
          // || (asPath.includes('=marketing') && (index === 0 ? 'slideInUp' : 'zoomIn'))
          // || (asPath.includes('=yellow') && (index === 0 ? 'flipInX' : 'slideInUp'))
          // || (asPath.length === 1 && (index === 0 ? 'zoomIn' : 'fadeInUp')
          // );

          return (
            <Fragment>
              {
              // TODO first variant
                // isMobile
                //   ? index === 3 && <Subscribe isMobile={isMobile} />
                //   : pageNumber === 1
                //     ? index === 8 && <Subscribe isMobile={isMobile} />
                //     : index === 9 && <Subscribe isMobile={isMobile} />
                // second variant
              }
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
                <Animated
                  isReveal={isSearch}
                  delay={isSearch ? 0 : delay}
                  animateIn={!isSearch && effect} // AOS
                  effect={isSearch && effect} // Reveal
                  animateOnce // AOS
                  offset={10} // AOS
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
                      {isMobile
                        ? <p className={styles.description}>{art.description}</p>
                        : pageNumber !== 1
                          ? <p className={styles.description}>{art.description}</p>
                          : index !== 0 && index !== 1 && asPath.length !== 1 && <p className={styles.description}>{art.description}</p>}
                    </div>
                  </LinkWrapper>
                </Animated>
              </div>
            </Fragment>
          );
        })}
      </Loader>
    </div>
  );
};

Articles.defaultProps = {
  isSearch: false,
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  isSearch: PropTypes.string,
};

export default Articles;
