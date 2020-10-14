import React from 'react';
import PropTypes from 'prop-types';
import { Loader, SubscribeBlock } from 'components';
import { animatedType } from 'utils/constants';
import { Article } from './Article';
import styles from './styles.module.scss';

export const ArticlesList = ({
  articles,
  isLoading,
  isSearch,
  asPath,
  currentPage,
}) => (
  <div className={styles.articlesList}>
    {currentPage === 1 && asPath.includes('blog') && <SubscribeBlock isBlog />}
    <Loader isLoading={!isLoading}>
      {articles && articles.map((article, index) => {
        const delay = isSearch ? (30 * index) : (100 + 100 * index);
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
            translateY: '2.82352941em',
            opasityDuration: 1,
            transformDuration: 1,
            transitionDelay: delay,
          };

        return (
          <Article
            key={article.title}
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
  asPath: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
};
