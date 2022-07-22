import React from 'react';
import { Swiper } from 'swiper/react';
import PropTypes from 'prop-types';
import BlogArticle from '../BlogArticle';
import { getSwiperParams } from '../utils/blogHelper';
import styles from './styles.module.scss';

const desktopSwiperParams = getSwiperParams();

const BlogArticles = ({ blogArticles }) => (
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
  </div>
);

BlogArticles.propTypes = {
  blogArticles: PropTypes.arrayOf(PropTypes.shape({
    previewUrl: PropTypes.string,
    articleTitle: PropTypes.string,
    slug: PropTypes.string,
  })).isRequired,
};

export default BlogArticles;
