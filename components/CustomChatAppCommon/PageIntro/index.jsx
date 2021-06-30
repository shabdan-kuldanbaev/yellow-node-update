import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { Figures } from './Figures';
import styles from './styles.module.scss';

export const PageIntro = ({ sectionData }) => {
  const {
    title,
    description,
    images,
    contentModules,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'images',
      'contentModules',
    ],
  );
  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const figuresData = get(contentModules, '[0]', {});
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  if (!title || !description || !imageUrl) {
    return null;
  }

  return (
    <div className={styles.pageIntroContainer}>
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
      <Figures figuresData={figuresData} />
    </div>
  );
};

PageIntro.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};
