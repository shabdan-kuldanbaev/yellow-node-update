import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const ImageSection = (props) => {
  const {
    title,
    description,
    text,
    imageUrl,
    type,
  } = useSectionProps(props);

  if (!imageUrl || !text) return null;

  return (
    <section className={styles[type]}>
      <div className={styles.imageSection}>
        <Animated {...REVEAL_ANIMATION_PROPS}>
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
          <Animated {...REVEAL_ANIMATION_PROPS}>
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
