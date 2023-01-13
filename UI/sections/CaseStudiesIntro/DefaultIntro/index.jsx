import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ProjectLink } from './ProjectLink';
import { useDefaultIntro } from './utils/useDefaultIntro';
import styles from './styles.module.scss';

const DefaultIntro = (props) => {
  const {
    type,
    style,
    introSection,
    experiences,
    downloadLink,
    appLogoUrl,
    appBackgroundImageUrl,
    isMobileResolution,
    title,
    subtitle,
    description,
    imagesBundlesWithUrls,
  } = useDefaultIntro(props);

  return (
    <section
      ref={introSection}
      className={cn(styles[type], styles.container)}
      style={style}
    >
      <div className={styles.introSection}>
        <div className={styles.projectInfoContainer}>
          {appLogoUrl && (
            <img
              className={styles.logo}
              src={appLogoUrl}
              alt={appLogoUrl}
            />
          )}
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
          {/* TODO rewrite via the grid */}
          {(!isMobileResolution && downloadLink) && (
            <ProjectLink
              type={type}
              downloadLink={downloadLink}
              linkStyles={styles.appLink}
            />
          )}
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={appBackgroundImageUrl}
            alt={appBackgroundImageUrl}
          />
        </div>
        {imagesBundlesWithUrls.map((bundleUrl) => (
          <img
            className={styles.bundleImage}
            src={bundleUrl}
            alt={title}
            key={`intro-images-bundles/${bundleUrl}`}
          />
        ))}
        {(isMobileResolution && downloadLink) && (
          <ProjectLink
            type={type}
            downloadLink={downloadLink}
            linkStyles={styles.appLink}
          />
        )}
      </div>
      <div className={styles.experiencesContainer}>
        {experiences?.map(({
          fields: {
            title: experienceTitle,
            text,
          },
        }) => (
          <div
            key={experienceTitle}
            className={styles.experience}
          >
            <div className={styles.infoTitle}>
              {experienceTitle}
            </div>
            <ContentfulParser document={text} />
          </div>
        ))}
      </div>
    </section>
  );
};

DefaultIntro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default DefaultIntro;
