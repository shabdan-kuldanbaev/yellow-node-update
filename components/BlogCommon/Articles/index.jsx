import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  LinkWrapper,
  Loader,
  Animated,
  Subscribe,
} from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

const Articles = ({
  articles,
  isLoading,
  isSearch,
  isMobileResolution,
  asPath,
  currentPage,
}) => (
  <div className={styles.articlesGrid}>
    <Loader isLoading={!isLoading}>
      {articles && articles.map((art, index) => {
        const delay = isSearch ? (30 * index) : (250 + 30 * index);
        const effect = 'fadeInUp';
        const animatioProps = isSearch
          ? {
            // TODO type: animatedType.isCustom,
            // translateY: 50,
            // opasityDuration: 0.4,
            // transformDuration: 0.5,
            // transitionDelay: delay,
            // type: animatedType.isReveal,
            // delay,
            // distance: '100px',
            // bottom: true,
            // effect,
            type: animatedType.isFade,
            delay,
            distance: '50px',
            bottom: true,
            effect,
          }
          : {
            // TODO delay,
            // animateIn: effect,
            // animateOnce: true, // AOS
            // offset: 10,

            // TODO type: animatedType.isFade,
            // delay,
            // distance: '150px',
            // bottom: true,
            // effect,

            type: animatedType.isCustom,
            translateY: 50,
            opasityDuration: 0.4,
            transformDuration: 0.5,
            transitionDelay: delay,
          };

        return (
          <Fragment key={`art/${index}`}>
            {currentPage === 1 && asPath.includes('blog') && (isMobileResolution
              ? (index === 3 && <Subscribe isMobile={isMobileResolution} />)
              : (index === 8 && <Subscribe isMobile={isMobileResolution} />))}
            <div
              key={`articles/${art.id}`}
              className={cn({
                [styles.high]: index === 0 && currentPage === 1,
                [styles.medium]: index === 1 && currentPage === 1,
                [styles.low]: (currentPage === 1 && index !== 0 && index !== 1) || currentPage !== 1,
              })}
            >
              <Animated {...animatioProps}>
                <LinkWrapper
                  isLocalLink
                  dynamicRouting="/blog/[article]"
                  path={`/blog/${art.slug}`}
                >
                  {!isMobileResolution && currentPage === 1 && (index === 0 || index === 1) && <div className={styles.overlay} />}
                  <div className={styles.imgContainer}>
                    <div className={styles.image} style={{ backgroundImage: `url(${art.image})` }} />
                  </div>
                  <div className={styles.desc}>
                    {!isMobileResolution && (index === 0 || index === 1) && currentPage === 1
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
                    {isMobileResolution
                      ? <p className={styles.description}>{art.description}</p>
                      : currentPage !== 1
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

Articles.defaultProps = {
  isSearch: false,
  asPath: '',
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSearch: PropTypes.bool,
  isMobileResolution: PropTypes.bool.isRequired,
  asPath: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
};

export default Articles;
