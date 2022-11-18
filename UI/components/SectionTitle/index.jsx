import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { TYPOGRAPHY_SIZE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Typography from 'UI/components/Typography';
import styles from './styles.module.scss';

const SectionTitle = ({
  type,
  titleStyle,
  title,
  titleVariant,
  secondTitle,
  secondTitleVariant,
  subtitle,
  secondSubtitle,
  description,
  secondDescription,
  className,
}) => (
  <div className={cn(styles[type], className, { [titleStyle]: titleStyle })}>
    {console.log('type', type)}
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={50}
    >
      <Typography
        isBold
        size={TYPOGRAPHY_SIZE.headlineXL}
        variant={titleVariant}
        className={styles.title}
      >
        {title}
      </Typography>
    </Animated>
    {subtitle && (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={100}
      >
        <Typography className={styles.subtitle}>
          {subtitle}
        </Typography>
      </Animated>
    )}
    {description && (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={100}
      >
        <Typography className={styles.description}>
          {description}
        </Typography>
      </Animated>
    )}
    {secondTitle && (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={150}
      >
        <Typography
          isBold
          size={TYPOGRAPHY_SIZE.headlineS}
          variant={secondTitleVariant}
          className={styles.title}
        >
          {title}
        </Typography>
      </Animated>
    )}
    {secondSubtitle && (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={200}
      >
        <Typography className={styles.subtitle}>
          {secondSubtitle}
        </Typography>
      </Animated>
    )}
    {secondDescription && (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={200}
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
  titleVariant: 'h2',
  secondTitleVariant: 'h3',
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
  titleVariant: PropTypes.string,
  secondTitleVariant: PropTypes.string,
};

export default SectionTitle;
