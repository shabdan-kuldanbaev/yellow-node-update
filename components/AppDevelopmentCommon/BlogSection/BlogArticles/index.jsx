import React, { useMemo } from 'react';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';
import { getSwiperParams } from '../utils/blogHelper';
import BlogArticle from '../BlogArticle';
import styles from './styles.module.scss';

const BlogArticles = ({ blogArticles }) => {
  const { desktopSwiperParams, mobileSwiperParams } = useMemo(() => getSwiperParams(), []);

  return (
    <div className={styles.articlesContainer}>
      <div className={styles.desktopArticles}>
        <Swiper {...desktopSwiperParams}>
          {blogArticles.map(({
            articleTitle,
            slug,
            previewUrl,
          }) => (
            <div key={slug}>
              <BlogArticle
                previewUrl={previewUrl}
                articleTitle={articleTitle}
                slug={slug}
              />
            </div>
          ))}
        </Swiper>
      </div>
      <div className={styles.mobileArticles}>
        <Swiper {...mobileSwiperParams}>
          {blogArticles.map(({
            articleTitle,
            slug,
            previewUrl,
          }) => (
            <div key={slug}>
              <BlogArticle
                previewUrl={previewUrl}
                articleTitle={articleTitle}
                slug={slug}
              />
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

BlogArticles.propTypes = {
  blogArticles: PropTypes.arrayOf(PropTypes.shape({
    previewUrl: PropTypes.string,
    articleTitle: PropTypes.string,
    slug: PropTypes.string,
  })).isRequired,
};

export default BlogArticles;
