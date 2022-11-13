import React from 'react';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Animated from 'components/Common/Animated';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from '../../../utils/constants';
import useImageSectionProps from './useSectionProps';
import styles from './styles.module.scss';

const ImageSection = ({
  sectionData,
  type,
}) => {
  const {
    title,
    description,
    text,
    imageUrl,
  } = useImageSectionProps(sectionData);

  if (!imageUrl || !text) return null;

  return (
    <section className={styles[type]}>
      <div className={styles.imageSection}>
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={250}
        >
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </Animated>
        <div className={styles.experienceContent}>
          <SectionTitle
            title={title}
            subtitle={description}
            type="side"
            titleStyle={styles.titleStyle}
          />
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={350}
          >
            <ContentfulParser document={text} />
          </Animated>
        </div>
      </div>
    </section>
  );
};

ImageSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImageSection;
