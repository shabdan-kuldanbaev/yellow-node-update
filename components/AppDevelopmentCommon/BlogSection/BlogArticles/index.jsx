import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import BlogArticle from '../BlogArticle';
import { getSwiperParams } from '../utils/blogHelper';
import styles from './styles.module.scss';

const params = getSwiperParams();

const BlogArticles = ({ blogArticles }) => {
  const navPrev = useRef(null);
  const navNext = useRef(null);

  const swiperNavigation = {
    nextEl: navNext.current,
    prevEl: navPrev.current,
  };

  return (
    <div className={styles.articlesContainer}>
      <div className={styles.desktopArticles}>
        <Swiper
          {...params}
          navigation={swiperNavigation}
        >
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
