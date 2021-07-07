import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import SubscribeBlock from 'components/Common/SubscribeBlock';
import { ArticlePreview } from 'components/Common/ArticlePreview';
import { ARTICLE_PREVIEW_TYPES } from 'utils/constants';
import { getArticleProps } from './utils/propsHelper';
import styles from './styles.module.scss';

export const ArticlesList = ({
  articles,
  isSearch,
  isBlogPage,
  currentPage,
  handleOnFormSubmit,
  isMobileResolution,
  handleOnCloseModalWindow,
}) => {
  const articleType = isSearch
    ? ARTICLE_PREVIEW_TYPES.search
    : ARTICLE_PREVIEW_TYPES.blog;

  return (
    <div
      className={cn(styles.articlesList, {
        [styles.locationSubscribe]: !isSearch,
      })}
    >
      {currentPage === 1 && isBlogPage && (
        <SubscribeBlock
          isBlog
          handleOnSubmit={handleOnFormSubmit}
        />
      )}
      {articles && articles.map((article, index) => {
        const articleProps = getArticleProps({
          article,
          index,
          isSearch,
          isMobileResolution,
        });

        return (
          <ArticlePreview
            type={articleType}
            key={articleProps.title}
            index={index}
            animatioProps={articleProps.animatioProps}
            slug={articleProps.slug}
            title={articleProps.title}
            category={articleProps.categoryTag}
            introduction={articleProps.introduction}
            image={articleProps.previewImage}
            date={articleProps.publishedAt}
            isSearch={isSearch}
            handleOnCloseModalWindow={handleOnCloseModalWindow}
          />
        );
      })}
    </div>
  );
};

ArticlesList.defaultProps = {
  isSearch: false,
  isBlogPage: false,
  handleOnFormSubmit: () => {},
  handleOnCloseModalWindow: () => {},
  isMobileResolution: false,
};

ArticlesList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isSearch: PropTypes.bool,
  isBlogPage: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  handleOnFormSubmit: PropTypes.func,
  isMobileResolution: PropTypes.bool,
  handleOnCloseModalWindow: PropTypes.func,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(ArticlesList);
