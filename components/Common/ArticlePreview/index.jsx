import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Animated } from 'components/Common/Animated';
import { formatDate } from 'utils/helper';
import { ROUTES, CATEGORY_TAGS } from 'utils/constants';
import styles from './styles.module.scss';

export const ArticlePreview = ({
  slug,
  title,
  image,
  category,
  introduction,
  date,
  type,
  index,
  isSearch,
  handleOnCloseModalWindow,
  animatioProps,
}) => {
  const { path, dynamicPath } = ROUTES.article.getRoute(slug);
  const { path: categoryPath, dynamicPath: categoryDynamicPath } = ROUTES.blog.getRoute(category);
  const articleLinkProps = {
    isLocalLink: true,
    path,
    dynamicRouting: dynamicPath,
  };
  const isCategoryWithHashtag = ['blog', 'search'].includes(type);

  if (!slug || !title || !image) {
    return null;
  }

  const handleOnArticleClick = () => {
    if (isSearch) {
      handleOnCloseModalWindow();
    }
  };

  return (
    <article
      className={cn(styles[type], { [styles.medium]: index === 0 })}
      onClick={handleOnArticleClick}
    >
      <Animated {...animatioProps}>
        <LinkWrapper {...articleLinkProps}>
          <div
            className={styles.imgContainer}
            style={{ backgroundImage: `url(${image})` }}
          />
        </LinkWrapper>
        <div className={styles.articleContent}>
          {date && (
            <span className={styles.date}>
              {formatDate(date)}
            </span>
          )}
          <LinkWrapper
            isLocalLink
            path={categoryPath}
            dynamicRouting={categoryDynamicPath}
            className={styles.articlePreviewCategory}
          >
            <span className={styles.category}>
              {isCategoryWithHashtag
                ? `#${CATEGORY_TAGS[category].replace(/\s/g, '')}`
                : category}
            </span>
          </LinkWrapper>
          <LinkWrapper
            {...articleLinkProps}
            className={styles.articlePreviewTitle}
          >
            <h3 className={styles.title}>
              {title}
            </h3>
          </LinkWrapper>
          {introduction && (
            <LinkWrapper
              {...articleLinkProps}
              className={styles.articlePreviewIntroduction}
            >
              <p className={styles.introduction}>
                {introduction}
              </p>
            </LinkWrapper>
          )}
        </div>
      </Animated>
    </article>
  );
};

ArticlePreview.defaultProps = {
  introduction: '',
  date: '',
  isSearch: false,
  handleOnCloseModalWindow: () => {},
};

ArticlePreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  introduction: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number.isRequired,
  isSearch: PropTypes.bool,
  handleOnCloseModalWindow: PropTypes.func,
  animatioProps: PropTypes.instanceOf(Object).isRequired,
};
