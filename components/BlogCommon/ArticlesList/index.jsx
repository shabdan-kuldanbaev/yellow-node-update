import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { SubscribeBlock } from 'components';
import { Article } from './Article';
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
}) => (
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
        <Article
          key={articleProps.title}
          countNumber={index}
          animatioProps={articleProps.animatioProps}
          slug={articleProps.slug}
          title={articleProps.title}
          categoryTag={articleProps.categoryTag}
          introduction={articleProps.introduction}
          previewImage={articleProps.previewImage}
          isSearch={isSearch}
          handleOnCloseModalWindow={handleOnCloseModalWindow}
        />
      );
    })}
  </div>
);

ArticlesList.defaultProps = {
  isSearch: false,
  isBlogPage: false,
  handleOnFormSubmit: () => {},
  handleOnCloseModalWindow: () => {},
};

ArticlesList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isSearch: PropTypes.bool,
  isBlogPage: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  handleOnFormSubmit: PropTypes.func,
  isMobileResolution: PropTypes.bool.isRequired,
  handleOnCloseModalWindow: PropTypes.func,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(ArticlesList);
