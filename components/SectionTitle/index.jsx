import React from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './styles.module.scss';

const SectionTitle = ({ title, subtitle }) => (
  <div className={styles.titleContainer}>
    <ScrollAnimation animateIn="fadeInUp" animateOnce>
      <h1>{title}</h1>
    </ScrollAnimation>
    {subtitle && (
      <ScrollAnimation
        animateIn="fadeInUp"
        delay={300}
        animateOnce
      >
        <span>{subtitle}</span>
      </ScrollAnimation>
    )}
  </div>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionTitle;
