import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
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
  children,
}) => {
  const descriptionParagraphs = description?.split('||');

  return (
    <div className={cn(
      styles.sectionTitleContainer,
      styles[type],
      className,
      titleStyle,
    )}
    >
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={50}
      >
        <Typography
          data-title
          isBold
          size={TYPOGRAPHY_SIZE.headline38}
          mobileSize={TYPOGRAPHY_SIZE.headline24}
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
          <Typography
            data-subtitle
            size={TYPOGRAPHY_SIZE.paragrapgh16}
            className={styles.subtitle}
          >
            {subtitle}
          </Typography>
        </Animated>
      )}
      {descriptionParagraphs && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={100}
        >
          {descriptionParagraphs?.map((text, index) => (
            <Typography
              data-description
              size={TYPOGRAPHY_SIZE.paragrapgh16}
              className={styles.description}
              key={`paragraph/${index}`}
            >
              {text}
            </Typography>
          ))}
        </Animated>
      )}
      {secondTitle && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={150}
        >
          <Typography
            isBold
            data-second-title
            size={TYPOGRAPHY_SIZE.headline24}
            variant={secondTitleVariant}
            className={styles.title}
          >
            {secondTitle}
          </Typography>
        </Animated>
      )}
      {secondSubtitle && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={200}
        >
          <Typography
            data-second-subtitle
            className={styles.subtitle}
          >
            {secondSubtitle}
          </Typography>
        </Animated>
      )}
      {secondDescription && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={200}
        >
          <Typography
            data-second-description
            className={styles.description}
          >
            {secondDescription}
          </Typography>
        </Animated>
      )}
      {children}
    </div>
  );
};

SectionTitle.defaultProps = {
  type: 'default',
  titleStyle: '',
  subtitle: '',
  description: null,
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
