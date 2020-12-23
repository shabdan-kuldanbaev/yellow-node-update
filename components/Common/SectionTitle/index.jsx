import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated, LinkWrapper } from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const SectionTitle = ({
  title,
  styleTitle,
  subtitle,
  styleSubtitle,
  isFeedbackForm,
  linkText,
}) => {
  const animatedProps = {
    type: animatedType.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <div className={styles.titleContainer}>
      <Animated {...animatedProps} transitionDelay={250}>
        <h1 className={cn({ [styleTitle]: styleTitle })}>{title}</h1>
      </Animated>
      {subtitle && (
        <Animated {...animatedProps} transitionDelay={300}>
          {!isFeedbackForm
            ? <span className={cn({ [styleSubtitle]: styleSubtitle })}>{subtitle}</span>
            : (
              <p className={cn({ [styleSubtitle]: styleSubtitle })}>
                {subtitle}
                <span>
                  <LinkWrapper path="mailto:hi@yellow.systems" isLocalLink>{linkText}</LinkWrapper>
                </span>
              </p>
            )}
        </Animated>
      )}
    </div>
  );
};

SectionTitle.defaultProps = {
  styleTitle: null,
  styleSubtitle: null,
  isFeedbackForm: false,
  subtitle: '',
  linkText: null,
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  styleTitle: PropTypes.string,
  subtitle: PropTypes.string,
  styleSubtitle: PropTypes.string,
  isFeedbackForm: PropTypes.bool,
  linkText: PropTypes.string,
};
