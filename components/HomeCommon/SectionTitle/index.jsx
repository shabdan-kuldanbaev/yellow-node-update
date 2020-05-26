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
}) => (
  <div className={styles.titleContainer}>
    <Animated
      // TODO type={animatedType.isFade}
      // delay={0}
      // distance="30px"
      // bottom
      // effect="fadeInUp"

      type={animatedType.isCastom}
      translateY={20}
      opasityDuration={1}
      transformDuration={1}
      transitionDelay={270}
    >
      <h1 className={cn({ [styleTitle]: styleTitle })}>{title}</h1>
    </Animated>
    {subtitle && (
      <Animated
        // TODO type={animatedType.isFade}
        // delay={70}
        // distance="30px"
        // bottom
        // effect="fadeInUp"

        type={animatedType.isCastom}
        translateY={20}
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={300}
      >
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
