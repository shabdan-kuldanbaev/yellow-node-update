import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

export default function Post({
  post,
  className,
  mode,
}) {
  switch (mode) {
  case 'favorite': {
    return (
      <article className={cn(styles.post_favorite_preview, {
        [className]: className,
      })}
      >
        <LinkWrapper
          isLocalLink
          dynamicRouting="/blog/[article]"
          path={`/blog/${post.slug}`}
        >
          <div className={styles.post_favorite_preview_image}>
            <img
              src={post.preview_url}
              alt={post.title}
              className="img-responsive"
            />
          </div>
          <div className={styles.post_favorite_preview_content}>
            <div className={styles.post_favorite_preview_title}>
              {post.title}
            </div>
          </div>
        </LinkWrapper>
      </article>
    );
  }
  case 'related': {
    return (
      <article className={cn(styles.post_related_preview, {
        [className]: className,
      })}
      >
        <LinkWrapper
          className={styles.post_related_preview_image}
          isLocalLink
          dynamicRouting="/blog/[article]"
          path={`/blog/${post.slug}`}
        >
          <img
            src={post.preview_url}
            alt={post.title}
            className="img-responsive"
          />
        </LinkWrapper>
        <div className={styles.post_related_preview_content}>
          <LinkWrapper
            className={styles.post_related_preview_title}
            isLocalLink
            dynamicRouting="/blog/[article]"
            path={`/blog/${post.slug}`}
          >
            {post.title}
          </LinkWrapper>
          <p>{post.introduction}</p>
          {post.published_at
            ? <time>{dayjs(post.published_at).format('MMMM D, YYYY')}</time>
            : <time>date now</time>}
        </div>
      </article>
    );
  }
  default: {
    return (
      <article className={cn(styles.post_preview, {
        [className]: className,
      })}
      >
        <LinkWrapper
          isLocalLink
          dynamicRouting="/blog/[article]"
          path={`/blog/${post.slug}`}
        >
          <div className={styles.post_preview_image}>
            <img
              src={post.preview_url}
              alt={post.title}
              className="img-responsive"
            />
          </div>
          <div className={styles.post_preview_title}>
            {post.title}
          </div>
          {post.published_at
            ? <time>{dayjs(post.published_at).format('MMMM D, YYYY')}</time>
            : <time>date now</time>}
        </LinkWrapper>
        <p>{post.introduction}</p>
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
