import React from 'react';
import PropTypes from 'prop-types';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import {
  isIntroHasBackground,
  isTitleHasBackground,
  caseStudyLink,
  getIntroProps,
  titleText,
} from './utils/introHelper';
import styles from './styles.module.scss';

const VerticalIntro = ({
  type,
  introSection,
  data,
}) => {
  const {
    sectionStyle,
    backgroundImageUrl,
    appLogoUrl,
    title,
    subtitle,
    description,
    downloadLink,
    appBackgroundImageUrl,
    experiences,
  } = getIntroProps(type, data);

  return (
    <section
      ref={introSection}
      className={styles[type]}
      style={sectionStyle}
    >
      {isIntroHasBackground(type) && (
        <img
          src={backgroundImageUrl}
          className={styles.backgroundImage}
          alt={type}
        />
      )}
      <div className={styles.introSection}>
        <div className={styles.projectInfoContainer}>
          <img
            className={styles.logo}
            src={appLogoUrl}
            alt={appLogoUrl}
          />
          <div className={styles.title}>
            {titleText(type, title)}
            {isTitleHasBackground(type) && (
              <Svg
                type={SVG_IMAGES_TYPES.opensenseTitleBorder}
                className={styles.titleBackground}
              />
            )}
          </div>
          {subtitle && (
            <p className={styles.projectSubtitle}>
              {subtitle}
            </p>
          )}
          <p className={styles.projectDescription}>
            {description}
          </p>
        </div>
        {caseStudyLink(type, downloadLink)}
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={appBackgroundImageUrl}
            alt={appBackgroundImageUrl}
          />
        </div>
      </div>
      {experiences && (
        <div className={styles.experiencesContainer}>
          {experiences.map(({
            fields: {
              title: experienceTitle,
              text,
            },
          }) => (
            <div
              key={experienceTitle}
              className={styles.experience}
            >
              <p className={styles.infoTitle}>
                {experienceTitle}
              </p>
              <ContentfulParser document={text} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

VerticalIntro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default VerticalIntro;
