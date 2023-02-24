import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Svg from 'UI/components/Svg';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'UI/components/SectionTitle';
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
    title,
    subtitle,
    description,
    imagesBundlesWithUrls,
    displayProjectLink,
    displayProjectLinkMobile,
    imageBackgroundTitle,
  } = useDefaultIntro(props);

  return (
    <section
      ref={introSection}
      className={cn(styles[type], styles.section)}
      style={style}
    >
      <div className={styles.introSection}>
        <div className={styles.contentWrapper}>
          {appLogoUrl && (
            <Illustration
              priority
              transparent
              className={styles.logo}
              src={appLogoUrl}
              alt={appLogoUrl}
            />
          )}
          <SectionTitle
            title={title}
            titleVariant="h1"
            subtitle={subtitle}
            description={description}
            className={styles.sectionTitle}
          >
            {imageBackgroundTitle && (
              <Svg
                type={imageBackgroundTitle}
                className={styles.titleBackground}
              />
            )}
          </SectionTitle>
          {displayProjectLink && (
            <ProjectLink
              type={type}
              downloadLink={downloadLink}
              linkStyles={styles.appLink}
            />
          )}
        </div>
        <div className={styles.imageContainer}>
          <Illustration
            priority
            transparent
            className={styles.image}
            src={appBackgroundImageUrl}
            alt={appBackgroundImageUrl}
          />
        </div>
        {imagesBundlesWithUrls?.map((bundleUrl) => (
          <Illustration
            priority
            transparent
            className={styles.bundleImage}
            src={bundleUrl}
            alt={title}
            key={`intro-images-bundles/${bundleUrl}`}
          />
        ))}
        {displayProjectLinkMobile && (
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
