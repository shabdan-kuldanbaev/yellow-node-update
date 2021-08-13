import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { getAppstoreSvgType } from './utils/itemPreviewHelper';
import styles from './styles.module.scss';

export const ItemPreview = ({ data, type }) => {
  const {
    images,
    contentModules,
    view,
    title: slug,
  } = getDocumentFields(
    data,
    [
      'images',
      'contentModules',
      'view',
      'title',
    ],
  );

  const {
    title,
    subtitle,
    description,
    text,
    images: contentImages,
    contentModules: contentData,
    imagesBundles,
  } = getDocumentFields(get(contentModules, '[0]', {}));

  const downloadLink = getDocumentFields(get(contentData, '[0]'));
  const appBackgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(contentImages, '[0]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const appLogoUrl = getOptimizedContentfulImage(
    getFileUrl(get(contentImages, '[1]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]', '')),
    { fm: 'png' },
  );
  const style = backgroundImageUrl
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : {};

  return (
    <div
      style={style}
      className={cn(styles[type], styles[view])}
    >
      <div className={styles.projectPreview}>
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
          <ContentfulParser document={text} />
          {downloadLink && (
            <LinkWrapper path={downloadLink.url}>
              <Svg
                className={styles.appStore}
                type={getAppstoreSvgType(slug)}
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
        {imagesBundles && imagesBundles.map((bundle) => {
          const bundleUrl = getFileUrl(bundle);

          return (
            <img
              className={styles.imageBundle}
              src={bundleUrl}
              alt={title}
            />
          );
        })}
      </div>
    </div>
  );
};

ItemPreview.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
