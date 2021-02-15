import React from 'react';
import PropTypes from 'prop-types';
import { SubscribeBlock } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { Article } from './Article';
import styles from './styles.module.scss';

export const ArticlesList = ({
  articles,
  isSearch,
  isBlogPage,
  currentPage,
  handleOnFormSubmit,
}) => (
  <div className={styles.articlesList}>
    {currentPage === 1 && isBlogPage && <SubscribeBlock isBlog handleOnSubmit={handleOnFormSubmit} />}
    {articles && articles.map((article, index) => {
      const {
        slug,
        title,
        categoryTag,
        introduction,
        previewImageUrl,
      } = getDocumentFields(
        article,
        ['slug', 'title', 'categoryTag', 'introduction', 'previewImageUrl'],
      );
      const previewImage = getFileUrl(previewImageUrl);
      const delay = isSearch ? (30 * index) : (100 + 100 * index);
      const animatioProps = isSearch
        ? {
          type: ANIMATED_TYPE.isFade,
          delay,
          duration: 400,
          distance: '100px',
          bottom: true,
          effect: 'fadeInUp',
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
          categoryTag={categoryTag}
          introduction={introduction}
          previewImage={previewImage}
        />
      );
    })}
  </div>
);

ArticlesList.defaultProps = {
  isSearch: false,
  isBlogPage: false,
  handleOnFormSubmit: null,
};

ArticlesList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isSearch: PropTypes.bool,
  isBlogPage: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  handleOnFormSubmit: PropTypes.func,
};
