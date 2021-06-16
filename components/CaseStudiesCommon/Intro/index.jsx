import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { DOWNLOAD_LINKS } from './util/data';
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
  } = getDocumentFields(get(data, 'contentModules[0]', {}));
  const { contentModules } = getDocumentFields(get(data, 'contentModules[1]', {}));
  const appLogoUrl = getFileUrl(get(images, '[0]', {}));
  const appBackgroundImageUrl = getFileUrl(get(images, '[1]', {}));

  return (
    <section
      ref={introSection}
      className={cn(styles.container, styles[type])}
    >
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
        <LinkWrapper
          path={DOWNLOAD_LINKS[type]}
        >
          <Svg
            className={styles.appStore}
            type={SVG_IMAGES_TYPES.appstore}
          />
        </LinkWrapper>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={appBackgroundImageUrl}
          alt={appBackgroundImageUrl}
        />
      </div>
      <div className={styles.infoContainer}>
        {contentModules && contentModules.map(({ fields }) => (
          <div key={fields.title}>
            <p className={styles.infoTitle}>
              {fields.title}
            </p>
            <ContentfulParser document={fields.text} />
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
