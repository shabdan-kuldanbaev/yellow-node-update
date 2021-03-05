import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper, Animated } from 'components';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

export const Article = ({
  countNumber: index,
  animatioProps,
  slug,
  title,
  categoryTag,
  introduction,
  previewImage,
}) => (slug && title && introduction && previewImage && (
  <article key={`articles/${title}`} className={cn(styles.article, { [styles.medium]: index === 0 })}>
    <Animated {...animatioProps}>
      <LinkWrapper
        isLocalLink
        path={ROUTES.article.path(slug)}
        dynamicRouting={ROUTES.article.dynamicPath}
      >
        <div>
          <div>
            <div className={styles.imgContainer}>
              <div className={styles.image} style={{ backgroundImage: `url(${previewImage})` }} />
            </div>
            <div className={styles.articlePreview}>
              <h2 className={styles.title}><span>{title}</span></h2>
              <div className={styles.description}>{introduction}</div>
            </div>
          </div>
          {categoryTag && (
            <div className={styles.categoryName}>
              <LinkWrapper
                isLocalLink
                path={ROUTES.blog.getPath(categoryTag)}
                dynamicRouting={ROUTES.blog.dynamicPathWithCategory}
              >
                {categoryTag}
              </LinkWrapper>
            </div>
          )}
        </div>
      </LinkWrapper>
    </Animated>
  </article>
));

Article.defaultProps = {
  categoryTag: '',
};

Article.propTypes = {
  countNumber: PropTypes.number.isRequired,
  animatioProps: PropTypes.instanceOf(Object).isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  categoryTag: PropTypes.string,
  introduction: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
};
