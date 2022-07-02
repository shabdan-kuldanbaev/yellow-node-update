import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getReviewsProps } from './utils/reviewsHelper';
import { Reviews } from './Reviews';
import styles from './styles.module.scss';

export const ReviewsSection = ({ data, type }) => {
  const {
    title,
    reviews,
  } = getReviewsProps(data);

  if (!reviews.length) {
    return null;
  }

  return (
    <section className={styles[type]}>
      <SectionTitle
        title={title}
        titleStyle={styles.title}
      />
      <Reviews reviews={reviews} />
    </section>
  );
};

ReviewsSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
