import React, { useMemo } from 'react';
import Swiper from 'react-id-swiper';
import SwiperCors, {
  EffectCoverflow,
  Navigation,
} from 'swiper';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import { getBlogArticles, getSwiperParams } from './utils/blogHelper';
import styles from './styles.module.scss';
import BlogArticle from './BlogArticles/BlogArticle';
import BlogArticles from './BlogArticles';

SwiperCors.use([EffectCoverflow, Navigation]);

const BlogSection = ({ sectionData }) => {
  const {
    title,
    subtitle,
    description,
    contentModules,
  } = getDocumentFields(sectionData);

  if (!contentModules) {
    return null;
  }

  const blogArticles = getBlogArticles(contentModules);

  return (
    <section className={styles.sectionContainer}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <BlogArticles blogArticles={blogArticles} />
    </section>
  );
};

export default BlogSection;
