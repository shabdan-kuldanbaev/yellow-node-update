import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields, getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

export const FeaturesSection = ({ type, data }) => {
  const { contentModules, title, images } = data;

  if (!contentModules || !contentModules.length) {
    return null;
  }

  const imageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]')),
    { fm: 'png', fl: 'png8' },
  );

  return (
    <section className={styles[type]}>
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.mainContainer}>
        <div className={styles.featuresList}>
          {contentModules.map((feature, index) => {
            const { title: featureTitle, text } = getDocumentFields(feature);

            return (
              <Animated
                key={`${title} ${index}`}
                delay={50 * index}
                {...ANIMATION_CASE_STUDY_PROPS}
              >
                <div className={styles.featureContainer}>
                  <div className={styles.checkMark}>
                    <Svg
                      className={styles.icon}
                      type={SVG_IMAGES_TYPES.checkMark}
                    />
                  </div>
                  <div className={styles.contentContainer}>
                    <h3 className={styles.title}>
                      {featureTitle}
                    </h3>
                    <ContentfulParser document={text} />
                  </div>
                </div>
              </Animated>
            );
          })}
        </div>
        <div className={styles.imageContainer}>
          {imageUrl && (
            <Animated
              delay={500}
              {...ANIMATION_CASE_STUDY_PROPS}
            >
              <div>
                <img
                  className={styles.image}
                  src={imageUrl}
                  alt={title}
                />
              </div>
            </Animated>
          )}
        </div>
      </div>
    </section>
  );
};

FeaturesSection.defaultProps = {
  type: '',
};

FeaturesSection.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
};
