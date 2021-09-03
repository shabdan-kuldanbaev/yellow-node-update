import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { Figures } from './Figures';
import { getPageIntroProps } from './utils/pageIntroHelper';
import styles from './styles.module.scss';

export const PageIntro = ({
  introSection,
  sectionData,
  type,
}) => {
  const {
    title,
    description,
    imageUrl,
    figuresData,
    animatedProps,
  } = getPageIntroProps(sectionData);

  if (!title || !description || !imageUrl) {
    return null;
  }

  return (
    <section
      className={styles[type]}
      ref={introSection}
    >
      <div className={styles.pageIntroSection}>
        <div className={styles.pageIntroWrapper}>
          <div className={styles.pageTitleContainer}>
            <Animated
              {...animatedProps}
              transitionDelay={600}
            >
              <h1 className={styles.pageTitle}>
                {title}
              </h1>
            </Animated>
            <Animated
              {...animatedProps}
              transitionDelay={750}
            >
              <p className={styles.subtitle}>
                {description}
              </p>
            </Animated>
          </div>
          <Animated
            {...animatedProps}
            transitionDelay={600}
          >
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </Animated>
        </div>
        <Figures
          type={type}
          figuresData={figuresData}
        />
      </div>
    </section>
  );
};

PageIntro.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
};
