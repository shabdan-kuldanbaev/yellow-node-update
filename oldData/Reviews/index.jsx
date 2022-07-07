import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'components/Common/SectionTitle';
import Carousel from 'oldData/Carousel';

import styles from './styles.module.scss';

const Reviews = ({ className }) => (
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

export default Reviews;
