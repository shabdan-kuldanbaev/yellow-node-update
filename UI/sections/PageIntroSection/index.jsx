import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { Figures } from 'UI/components/Figures';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const PageIntroSection = (props) => {
  const {
    type,
    title,
    description,
    imageUrl,
    figuresData,
    introSection,
  } = useSectionProps(props);

  // TODO: use rich text instead of splitting
  const descriptionParagraphs = description.split('||');

  return (
    <section
      ref={introSection}
      className={cn(styles.pageIntroSection, styles[type])}
    >
      <div className={styles.pageWrapper}>
        <div className={styles.pageTextContainer}>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            {title && (
              <Typography
                variant="h1"
                className={styles.pageTitle}
              >
                {title}
              </Typography>
            )}
          </Animated>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            {descriptionParagraphs?.map((text, index) => (
              <Typography
                variant="p"
                className={styles.pageSubtitle}
                key={`paragraph/${index}`}
              >
                {text}
              </Typography>
            ))}
          </Animated>
        </div>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          {imageUrl && (
            <Illustration
              src={imageUrl}
              className={styles.pageImage}
              transparent
              priority
            />
          )}
        </Animated>
      </div>
      <Figures
        type={type}
        figuresData={figuresData}
      />
    </section>
  );
};

PageIntroSection.defaultProps = {
  introSection: null,
};

PageIntroSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object),
};

export default PageIntroSection;
