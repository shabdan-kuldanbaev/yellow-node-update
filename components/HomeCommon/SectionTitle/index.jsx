import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated, LinkWrapper } from 'components';
import styles from './styles.module.scss';

export const SectionTitle = ({
  title,
  styleTitle,
  subtitle,
  styleSubtitle,
  isFeedbackForm,
}) => (
  <div className={styles.titleContainer}>
    <Animated animateIn="fadeInUp" animateOnce>
      <h1 className={cn({ [styleTitle]: styleTitle })}>{title}</h1>
    </Animated>
    {subtitle && (
      <Animated animateIn="fadeInUp" animateOnce>
        {!isFeedbackForm
          ? <span className={cn({ [styleSubtitle]: styleSubtitle })}>{subtitle}</span>
          : (
            <p className={cn({ [styleSubtitle]: styleSubtitle })}>
              Fill in this form or
              <LinkWrapper path="mailto:hi@yellow.systems" isLocalLink>send us an e-mail</LinkWrapper>
            </p>
          )}
      </Animated>
    )}
  </div>
);

SectionTitle.defaultProps = {
  styleTitle: null,
  styleSubtitle: null,
  isFeedbackForm: false,
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  styleTitle: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  styleSubtitle: PropTypes.string,
  isFeedbackForm: PropTypes.bool,
};
