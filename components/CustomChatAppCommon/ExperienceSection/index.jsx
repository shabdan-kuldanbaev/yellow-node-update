import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Animated } from 'components/Common/Animated';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const ExperienceSection = ({ sectionData }) => {
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
  const textData = get(contentModules, '[0]', {});
  const { text } = getDocumentFields(textData);
  const image = get(images, '[0]', {});
  const imageUrl = getFileUrl(image);
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  if (!imageUrl || !text) {
    return null;
  }

  return (
    <div className={styles.experienceSection}>
      <Animated
        {...animatedProps}
        transitionDelay={600}
      >
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imageUrl})` }}
          alt=""
        />
      </Animated>
      <div className={styles.experienceContent}>
        <SectionTitle
          title={title}
          subtitle={description}
          type="side"
        />
        <Animated
          {...animatedProps}
          transitionDelay={700}
        >
          <ContentfulParser document={text} />
        </Animated>
      </div>
    </div>
  );
};

ExperienceSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};
