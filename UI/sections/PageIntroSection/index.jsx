import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { Figures } from 'UI/components/Figures';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
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

  if (!title || !description || !imageUrl) return null;

  // TODO: use rich text instead of splitting
  const descriptionParagraphs = description.split('||');

  return (
    <section
      ref={introSection}
      className={cn(styles.pageIntroSection, styles[type])}
    >
      <div className={styles.pageIntroWrapper}>
        <div className={styles.pageTitleContainer}>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <h1 className={styles.pageTitle}>
              {title}
            </h1>
          </Animated>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            {descriptionParagraphs?.map((text, index) => (
              <p
                className={styles.pageIntroSubtitle}
                key={`paragraph/${index}`}
              >
                {text}
              </p>
            ))}
          </Animated>
        </div>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <div
            className={styles.pageIntroImage}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
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
