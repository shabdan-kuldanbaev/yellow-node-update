import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
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
  isMobileResolution,
}) => (
  <div className={cn(styles.articlesList, { [styles.locationSubscribe]: !isSearch })}>
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
      const delay = isSearch ? (30 * index) : (100 + 50 * index);
      let animatioProps = isSearch
        ? {
          type: ANIMATED_TYPE.isFade,
          delay,
          duration: 200,
          distance: '1rem',
          bottom: true,
          effect: 'fadeInUp',
        }
        : {
          type: ANIMATED_TYPE.isCustom,
          translateY: '1.5em',
          opasityDuration: 1,
          transformDuration: 1,
          transitionDelay: delay,
        };

      if (isMobileResolution) {
        animatioProps = {
          type: ANIMATED_TYPE.isCustom,
          translateY: '0.05em',
          opasityDuration: 0.05,
          transformDuration: 0.05,
          transitionDelay: 100,
        };
      }

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
  handleOnFormSubmit: () => {},
};

ArticlesList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isSearch: PropTypes.bool,
  isBlogPage: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  handleOnFormSubmit: PropTypes.func,
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(ArticlesList);
