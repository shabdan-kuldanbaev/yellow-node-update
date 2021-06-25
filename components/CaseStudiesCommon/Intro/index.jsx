import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Intro = ({
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
  const appLogoUrl = getFileUrl(get(images, '[0]', ''));
  const appBackgroundImageUrl = getFileUrl(get(images, '[1]', ''));
  const downloadLink = getDocumentFields(get(contentModules, '[0]'));
  console.log(getFileUrl(get(data, 'images[0]', '')));
  const backgroundImageUrl = getFileUrl(get(data, 'images[0]', ''));

  const style = { backgroundImage: `url(${backgroundImageUrl})` };

  return (
    <section
      ref={introSection}
      className={styles[type]}
      style={style}
    >
      <div className={styles.introSection}>
        <div className={styles.projectInfoContainer}>
          <img
            className={styles.logo}
            src={appLogoUrl}
            alt={appLogoUrl}
          />
          <h1 className={styles.projectTitle}>
            {title}
          </h1>
          {subtitle && (
            <p className={styles.projectSubtitle}>
              {subtitle}
            </p>
          )}
          <p className={styles.projectDescription}>
            {description}
          </p>
          {downloadLink && (
            <LinkWrapper path={downloadLink.url}>
              <Svg
                className={styles.appStore}
                type={SVG_IMAGES_TYPES.appstore}
              />
            </LinkWrapper>
          )}
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

Intro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Intro;
