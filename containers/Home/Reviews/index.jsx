import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SectionTitle, Reviews } from 'components';
import { reviews } from './utils/data';
import styles from './styles.module.scss';

export const ReviewsContainer = ({ className }) => (
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
