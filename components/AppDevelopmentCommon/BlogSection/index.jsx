import React from 'react';
import PropTypes from 'prop-types';
import SwiperCors, { EffectCoverflow, Navigation } from 'swiper';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import BlogArticles from './BlogArticles';
import { getBlogArticles } from './utils/blogHelper';
import styles from './styles.module.scss';

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

BlogSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};

export default BlogSection;
