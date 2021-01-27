import React from 'react';
import PropTypes from 'prop-types';
import { Loader, SubscribeBlock } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { Article } from './Article';
import styles from './styles.module.scss';

export const ArticlesList = ({
  articles,
  isLoading,
  isSearch,
  asPath,
  currentPage,
  handleOnFormSubmit,
}) => (
  <div className={styles.articlesList}>
    {currentPage === 1 && asPath.includes('blog') && <SubscribeBlock isBlog handleOnSubmit={handleOnFormSubmit} />}
    <Loader isLoading={!isLoading}>
      {articles && articles.map((article, index) => {
        const {
          slug,
          title,
          categoruTag,
          introduction,
          previewImageUrl,
        } = getDocumentFields(
          article,
          ['slug', 'title', 'categoryTag', 'introduction', 'previewImageUrl'],
        );
        const previewImage = getFileUrl(previewImageUrl);
        const delay = isSearch ? (30 * index) : (100 + 100 * index);
        const effect = 'fadeInUp';
        const animatioProps = isSearch
          ? {
            type: ANIMATED_TYPE.isFade,
            delay,
            duration: 400,
            distance: '100px',
            bottom: true,
            effect,
          }
          : {
            type: ANIMATED_TYPE.isCustom,
            translateY: '2.82352941em',
            opasityDuration: 1,
            transformDuration: 1,
            transitionDelay: delay,
          };

        return (
          <Article
            key={title}
            countNumber={index}
            animatioProps={animatioProps}
            slug={slug}
            title={title}
            categoruTag={categoruTag}
            introduction={introduction}
            previewImage={previewImage}
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
  handleOnFormSubmit: PropTypes.func.isRequired,
};
