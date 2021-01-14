import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

export default function Post({
  post,
  className,
  mode,
}) {
  const slug = get(post, 'fields.slug', '');
  const previewImageUrl = get(post, 'fields.previewImageUrl.fields.file.url', '');
  const title = get(post, 'fields.title', '');
  const publishedAt = get(post, 'fields.publishedAt', '');
  const introduction = get(post, 'fields.introduction', '');

  switch (mode) {
  case 'favorite': {
    return (
      <article className={cn(styles.post_favorite_preview, { [className]: className })}>
        <LinkWrapper
          isLocalLink
          dynamicRouting="/blog/[article]"
          path={`/blog/${slug}`}
        >
          <div className={styles.post_favorite_preview_image}>
            <img
              src={previewImageUrl}
              alt={title}
              className="img-responsive"
            />
          </div>
          <div className={styles.post_favorite_preview_content}>
            <div className={styles.post_favorite_preview_title}>{title}</div>
          </div>
        </LinkWrapper>
      </article>
    );
  }
  case 'related': {
    return (
      <article className={cn(styles.post_related_preview, { [className]: className })}>
        <LinkWrapper
          className={styles.post_related_preview_image}
          isLocalLink
          dynamicRouting="/blog/[article]"
          path={`/blog/${slug}`}
        >
          <img
            src={previewImageUrl}
            alt={title}
            className="img-responsive"
          />
        </LinkWrapper>
        <div className={styles.post_related_preview_content}>
          <LinkWrapper
            className={styles.post_related_preview_title}
            isLocalLink
            dynamicRouting="/blog/[article]"
            path={`/blog/${slug}`}
          >
            {title}
          </LinkWrapper>
          <p>{introduction}</p>
          {publishedAt
            ? <time>{dayjs(publishedAt).format('MMMM D, YYYY')}</time>
            : <time>date now</time>}
        </div>
      </article>
    );
  }
  default: {
    return (
      <article className={cn(styles.post_preview, { [className]: className })}>
        <LinkWrapper
          isLocalLink
          dynamicRouting="/blog/[article]"
          path={`/blog/${slug}`}
        >
          <div className={styles.post_preview_image}>
            <img
              src={previewImageUrl}
              alt={title}
              className="img-responsive"
            />
          </div>
          <div className={styles.post_preview_title}>
            {title}
          </div>
          {publishedAt
            ? <time>{dayjs(publishedAt).format('MMMM D, YYYY')}</time>
            : <time>date now</time>}
        </LinkWrapper>
        <p>{introduction}</p>
      </article>
    );
  }
  }
}

Post.propTypes = {
  post: PropTypes.shape.isRequire,
  className: PropTypes.stirng,
  mode: PropTypes.string,
};
