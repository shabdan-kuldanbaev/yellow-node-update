import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Carousel, SectionTitle } from 'components';
import styles from './styles.module.scss';

export const Reviews = ({ className }) => (
  <section className={cn(styles.reviews, { [className]: className })}>
    <SectionTitle title="What people say" />
    <Carousel />
  </section>
);

Reviews.defaultProps = {
  className: '',
};

Reviews.propTypes = {
  className: PropTypes.string,
};
