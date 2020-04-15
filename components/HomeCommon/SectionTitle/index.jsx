import React from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './styles.module.scss';
import cn from 'classnames';

const SectionTitle = ({
  title,
  styleTitle,
  subtitle,
  styleSubtitle,
  isFeedbackForm,
}) => (
  <div className={styles.titleContainer}>
    <ScrollAnimation animateIn="fadeInUp" animateOnce>
      <h1 className={cn({[styleTitle]: styleTitle})}>{title}</h1>
    </ScrollAnimation>
    {subtitle && (
      <ScrollAnimation
        animateIn="fadeInUp"
        animateOnce
      >
        {!isFeedbackForm
          ? <span className={cn({[styleSubtitle]: styleSubtitle})}>{subtitle}</span>
          : (
            <p className={cn({[styleSubtitle]: styleSubtitle})}>
              Fill in this form or
              <span>
                <a
                  href="mailto:hi@yellow.systems"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  send us an e-mail
                </a>
              </span>
            </p>
        )}
      </ScrollAnimation>
    )}
  </div>
);
SectionTitle.defaultProps = {
  styleTitle: null,
  styleSubtitle: null,
  isFeedbackForm: false,
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  styleTitle: PropTypes.string,
  subtitle: PropTypes.string,
  styleSubtitle: PropTypes.string,
  isFeedbackForm: PropTypes.bool,
};

export default SectionTitle;
