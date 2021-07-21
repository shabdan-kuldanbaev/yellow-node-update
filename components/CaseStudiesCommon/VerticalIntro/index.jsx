import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import {
  isIntroHasBackground,
  isTitleHasBackground,
  caseStudyLink,
} from './utils/introHelper';
import styles from './styles.module.scss';

const VerticalIntro = ({
  type,
  introSection,
  data,
}) => {
  const {
    title,
    subtitle,
    description,
    images,
    contentModules,
  } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
    [
      'title',
      'subtitle',
      'description',
      'images',
      'contentModules',
    ],
  );
  const { contentModules: experiences } = getDocumentFields(
    get(data, 'contentModules[1]', {}),
    ['contentModules'],
  );
  const downloadLink = getDocumentFields(get(contentModules, '[0]'));
  const appLogoUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const appBackgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[1]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'images[0]', '')),
    { fm: 'png' },
  );
  const style = (backgroundImageUrl && !isIntroHasBackground) ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  return (
    <section
      ref={introSection}
      className={styles[type]}
      style={style}
    >
      {isIntroHasBackground && (
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
            <h1 className={styles.projectTitle}>
              {title}
            </h1>
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
          {downloadLink && caseStudyLink(type, downloadLink)}
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={appBackgroundImageUrl}
            alt={appBackgroundImageUrl}
          />
        </div>
      </div>
      <div className={styles.experiencesContainer}>
        {experiences && experiences.map(({
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
    </section>
  );
};

VerticalIntro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default VerticalIntro;
