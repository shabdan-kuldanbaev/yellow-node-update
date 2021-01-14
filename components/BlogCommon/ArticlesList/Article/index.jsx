import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import { LinkWrapper, Animated } from 'components';
import styles from './styles.module.scss';

export const Article = ({
  article,
  countNumber: index,
  animatioProps,
}) => {
  const previewImage = get(article, 'previewImageUrl.fields.file.url', '');
  const title = get(article, 'title', '');
  const categoryTag = get(article, 'categoryTag', '');
  const introduction = get(article, 'introduction', '');

  return (
    <article key={`articles/${title}`} className={cn(styles.article, { [styles.medium]: index === 0 })}>
      <Animated {...animatioProps}>
        <LinkWrapper
          isLocalLink
          dynamicRouting="/blog/[article]"
          path={`/blog/${article.slug}`}
        >
          <div>
            <div>
              <div className={styles.imgContainer}>
                <div className={styles.image} style={{ backgroundImage: `url(${previewImage})` }} />
              </div>
              <div className={styles.articlePreview}>
                <h2 className={styles.title}><a>{title}</a></h2>
                <div className={styles.description}>{introduction}</div>
              </div>
            </div>
            {categoryTag ? (
              <div className={styles.categoryName}>
                <LinkWrapper
                  isLocalLink
                  dynamicRouting={`/blog?category=${categoryTag}&page=1`}
                  path={`/blog?category=${categoryTag}&page=1`}
                >
                  {categoryTag}
                </LinkWrapper>
              </div>
            ) : null}
          </div>
        </LinkWrapper>
      </Animated>
    </article>
  );
};

Article.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  countNumber: PropTypes.number.isRequired,
  animatioProps: PropTypes.instanceOf(Object).isRequired,
};
