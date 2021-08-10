import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import { getReviewsProps } from './utils/reviewsHelper';
import { Reviews } from './Reviews';
import styles from './styles.module.scss';

export const ReviewsSection = ({ data, type }) => {
  const {
    title,
    contentModules,
  } = getDocumentFields(data);
  const reviews = getReviewsProps(contentModules);

  if (!reviews.length) {
    return null;
  }

  return (
    <section className={styles[type]}>
      <SectionTitle
        title={title}
      />
      <Reviews reviews={reviews} />
    </section>
  );
};

ReviewsSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
