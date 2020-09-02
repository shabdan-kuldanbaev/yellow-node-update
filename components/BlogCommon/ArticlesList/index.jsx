import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Subscribe } from 'components';
import { animatedType } from 'utils/constants';
import { Article } from './Article';
import styles from './styles.module.scss';

export const ArticlesList = ({
  articles,
  isLoading,
  isSearch,
  isMobileResolution,
  asPath,
  currentPage,
}) => (
  <div className={styles.articlesList}>
    {currentPage === 1 && asPath.includes('blog') && <Subscribe isMobile={isMobileResolution} />}
    <Loader isLoading={!isLoading}>
      {articles && articles.map((article, index) => {
        const delay = isSearch ? (30 * index) : (250 + 40 * index);
        const effect = 'fadeInUp';
        const animatioProps = isSearch
          ? {
            type: animatedType.isFade,
            delay,
            duration: 400,
            distance: '100px',
            bottom: true,
            effect,
          }
          : {
            type: animatedType.isCustom,
            translateY: 100,
            opasityDuration: 0.4,
            transformDuration: 0.8,
            transitionDelay: delay,
          };

        return (
          <Article
            article={article}
            countNumber={index}
            animatioProps={animatioProps}
          />
        );
      })}
    </Loader>
  </div>
);

ArticlesList.defaultProps = {
  isSearch: false,
  asPath: '',
};

ArticlesList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSearch: PropTypes.bool,
  isMobileResolution: PropTypes.bool.isRequired,
  asPath: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
};
