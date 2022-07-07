import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { ProjectLink } from './ProjectLink';
import styles from './styles.module.scss';

const DefaultIntro = ({
  type,
  introSection,
  data,
  isMobileResolution,
}) => {
  const {
    title,
    subtitle,
    description,
    images,
    contentModules,
    imagesBundles,
  } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
    [
      'title',
      'subtitle',
      'description',
      'images',
      'contentModules',
      'imagesBundles',
    ],
  );
  const { contentModules: experiences } = getDocumentFields(
    get(data, 'contentModules[1]', {}),
    ['contentModules'],
  );
  const downloadLink = getDocumentFields(get(contentModules, '[0]'));
  const appLogoUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[1]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const appBackgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'images[0]', '')),
    { fm: 'png' },
  );
  const style = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  return (
    <section
      ref={introSection}
      className={styles[type]}
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
        {imagesBundles && imagesBundles.map((bundle) => {
          const bundleUrl = getFileUrl(bundle);

          return (
            <img
              className={styles.bundleImage}
              src={bundleUrl}
              alt={title}
              key={`intro-images-bundles/${bundleUrl}`}
            />
          );
        })}
        {(isMobileResolution && downloadLink) && (
          <ProjectLink
            type={type}
            downloadLink={downloadLink}
            linkStyles={styles.appLink}
          />
        )}
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

DefaultIntro.defaultProps = {
  isMobileResolution: '',
};

DefaultIntro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(DefaultIntro);
