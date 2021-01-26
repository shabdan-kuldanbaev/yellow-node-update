import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, ImageWithPlaceholder } from 'components';
import { routes } from 'utils/constants';
import styles from './styles.module.scss';

export const Article = ({
  slug,
  title,
  image,
}) => (slug && title && image && (
  <article className={styles.article}>
    <LinkWrapper
      isLocalLink
      dynamicRouting="/blog/[article]"
      path={routes.article(slug)}
    >
      <div>
        <div className={styles.imgContainer}>
          <ImageWithPlaceholder src={image} imageStyle={styles.img} />
        </div>
        <div className={styles.articleContent}>
          <h2 className={styles.title}><a>{title}</a></h2>
        </div>
      </div>
    </LinkWrapper>
  </article>
));

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
