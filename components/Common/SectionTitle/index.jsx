import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const SectionTitle = ({
  title,
  styleTitle,
  subtitle,
  styleSubtitle,
  isFeedbackForm,
  linkText,
  isMainTitle,
  styleContainer,
}) => {
  const TitleTag = `h${isMainTitle ? 1 : 2}`;
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <div className={cn(styles.titleContainer, styleContainer)}>
      <Animated
        {...animatedProps}
        transitionDelay={250}
      >
        <TitleTag className={cn({ [styleTitle]: styleTitle })}>
          {title}
        </TitleTag>
      </Animated>
      {subtitle && (
        <Animated
          {...animatedProps}
          transitionDelay={300}
        >
          {!isFeedbackForm
            ? (
              <span className={cn({ [styleSubtitle]: styleSubtitle })}>
                {subtitle}
              </span>
            )
            : (
              <p className={cn({ [styleSubtitle]: styleSubtitle })}>
                {subtitle}
                <span>
                  <LinkWrapper
                    path="mailto:hi@yellow.systems"
                    isLocalLink
                  >
                    {linkText}
                  </LinkWrapper>
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
  isMainTitle: false,
  styleContainer: '',
};

SectionTitle.propTypes = {
  styleContainer: PropTypes.string,
  title: PropTypes.string.isRequired,
  styleTitle: PropTypes.string,
  subtitle: PropTypes.string,
  styleSubtitle: PropTypes.string,
  isFeedbackForm: PropTypes.bool,
  linkText: PropTypes.string,
  isMainTitle: PropTypes.bool,
};
