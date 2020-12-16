import React from 'react';
import { Link } from 'next/link';
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function Post({ post, className, mode }) {
  switch (mode) {
  case 'favorite': {
    const classes = classNames(styles.post_favorite_preview, {
      [className]: className,
    });

    return (
      <article className={classes}>
        <Link
          to={`/blog/${post.slug}`}
        >
          <div className={styles.post_favorite_preview_image}>
            <img src={post.preview_url} alt={post.title} className="img-responsive" />
          </div>
          <div className={styles.post_favorite_preview_content}>
            <div className={styles.post_favorite_preview_title}>
              { post.title }
            </div>
          </div>
        </Link>
      </article>
    );
  }
  case 'related': {
    const classes = classNames(styles.post_related_preview, {
      [className]: className,
    });

    return (
      <article className={classes}>
        <Link
          className={styles.post_related_preview_image}
          to={`/blog/${post.slug}`}
        >
          <img src={post.preview_url} alt={post.title} className="img-responsive" />
        </Link>

        <div className={styles.post_related_preview_content}>
          <Link
            className={styles.post_related_preview_title}
            to={`/blog/${post.slug}`}
          >
            { post.title }
          </Link>
          <p>{post.introduction}</p>
          {
            post.published_at
              ? <time>{moment(post.published_at).format('MMMM D, YYYY')}</time>
              : <time>date now</time>
          }
        </div>
      </article>
    );
  }
  default: {
    const classes = classNames(styles.post_preview, {
      [className]: className,
    });

    return (
      <article className={classes}>
        <Link
          to={`/blog/${post.slug}`}
        >
          <div className={styles.post_preview_image}>
            <img src={post.preview_url} alt={post.title} className="img-responsive" />
          </div>
          <div className={styles.post_preview_title}>
            { post.title }
          </div>
          {
            post.published_at
              ? <time>{moment(post.published_at).format('MMMM D, YYYY')}</time>
              : <time>date now</time>
          }
        </Link>
        <p>{post.introduction}</p>
      </article>
    );
  }
  }
}

Post.propTypes = {
  post: PropTypes.shape,
  className: PropTypes.stirng,
  mode: PropTypes.string,
};
