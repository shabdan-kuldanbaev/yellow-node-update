import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { SwiperNavigation } from 'components/SwiperNavigation';
import BlogArticle from '../BlogArticle';
import { getSwiperParams } from '../utils/blogHelper';
import styles from './styles.module.scss';

const params = getSwiperParams();

const BlogArticles = ({ blogArticles }) => (
  <div className={styles.articlesContainer}>
    <Swiper {...params}>
      {blogArticles.map(({
        articleTitle,
        slug,
        previewUrl,
      }) => (
        <SwiperSlide key={slug}>
          <BlogArticle
            previewUrl={previewUrl}
            articleTitle={articleTitle}
            slug={slug}
          />
        </SwiperSlide>
      ))}
      <SwiperNavigation className={styles.navigation} />
    </Swiper>
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
