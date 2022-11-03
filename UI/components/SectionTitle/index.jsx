import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { TYPOGRAPHY_SIZE, ANIMATED_TYPE } from 'utils/constants';
import Typography from 'UI/components/Typography';
import styles from './styles.module.scss';

const animationProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};

const SectionTitle = ({
  type,
  titleStyle,
  title,
  secondTitle,
  subtitle,
  secondSubtitle,
  description,
  secondDescription,
  className,
}) => (
  <div className={cn(styles[type], className, { [titleStyle]: titleStyle })}>
    <Animated
      {...animationProps}
      transitionDelay={250}
    >
      <Typography
        isBold
        size={TYPOGRAPHY_SIZE.headlineXL}
        variant="h2"
        className={styles.title}
      >
        {title}
      </Typography>
    </Animated>
    {subtitle && (
      <Animated
        {...animationProps}
        transitionDelay={300}
      >
        <Typography className={styles.subtitle}>
          {subtitle}
        </Typography>
      </Animated>
    )}
    {description && (
      <Animated
        {...animationProps}
        transitionDelay={350}
      >
        <Typography className={styles.description}>
          {description}
        </Typography>
      </Animated>
    )}
    {secondTitle && (
      <Animated
        {...animationProps}
        transitionDelay={250}
      >
        <Typography
          isBold
          size={TYPOGRAPHY_SIZE.headlineS}
          variant="h2"
          className={styles.title}
        >
          {title}
        </Typography>
      </Animated>
    )}
    {secondSubtitle && (
      <Animated
        {...animationProps}
        transitionDelay={300}
      >
        <Typography className={styles.subtitle}>
          {secondSubtitle}
        </Typography>
      </Animated>
    )}
    {secondDescription && (
      <Animated
        {...animationProps}
        transitionDelay={350}
      >
        <Typography className={styles.description}>
          {secondDescription}
        </Typography>
      </Animated>
    )}
  </div>
);

SectionTitle.defaultProps = {
  type: 'default',
  titleStyle: '',
  subtitle: '',
  description: '',
  className: null,
  title: null,
  secondTitle: '',
  secondSubtitle: '',
  secondDescription: '',
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  titleStyle: PropTypes.string,
  title: PropTypes.string,
  secondTitle: PropTypes.string,
  subtitle: PropTypes.string,
  secondSubtitle: PropTypes.string,
  description: PropTypes.string,
  secondDescription: PropTypes.string,
  className: PropTypes.string,
};

export default SectionTitle;
