import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Reviews } from 'components/Common/Reviews';
import { SectionTitle } from 'components/Common/SectionTitle';
import { reviews } from './utils/data';
import styles from './styles.module.scss';

const ReviewsContainer = ({ className }) => (
  <section className={cn(styles.reviews, { [className]: className })}>
    <SectionTitle title="What people say" />
    <Reviews reviews={reviews} />
  </section>
);

ReviewsContainer.defaultProps = {
  className: '',
};

ReviewsContainer.propTypes = {
  className: PropTypes.string,
};

export default ReviewsContainer;
