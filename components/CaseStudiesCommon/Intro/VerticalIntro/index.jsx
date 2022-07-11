import React from 'react';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import CustomImage from 'components/Common/CustomImage';
import Svg from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import {
  isIntroHasBackground,
  isTitleHasBackground,
  caseStudyLink,
  getIntroProps,
} from './utils/introHelper';
import { TitleText } from './TitleText';
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
    sectionBackground,
    experiences,
  } = getIntroProps(type, data);

  return (
    <section
      ref={introSection}
      className={styles[type]}
    >
      <CustomImage
        src={sectionBackground}
        layout="fill"
        containerClasses={styles.sectionBackground}
      />
      {isIntroHasBackground(type) && (
        <img
          src={backgroundImageUrl}
          className={styles.backgroundImage}
          alt={type}
        />
      )}
      <div className={styles.introSection}>
        <div className={styles.projectInfoContainer}>
          {appLogoUrl && (
            <img
              className={styles.logo}
              src={appLogoUrl}
              alt={title}
            />
          )}
          <div className={styles.title}>
            <TitleText
              type={type}
              data={title}
            />
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
        <CustomImage
          src={appBackgroundImageUrl}
          alt={appBackgroundImageUrl}
          layout="responsive"
          width={1400}
          height={900}
          objectFit="contain"
          containerClasses={styles.imageContainer}
          className={styles.image}
        />
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
