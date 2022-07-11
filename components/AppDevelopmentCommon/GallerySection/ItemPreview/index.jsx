import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Svg from 'components/Common/Svg';
import { getFileUrl } from 'utils/helper';
import { TitleText } from './TitleText';
import { getAppstoreSvgType, getItemPreviewProps } from './utils/itemPreviewHelper';
import styles from './styles.module.scss';

export const ItemPreview = ({ data, type }) => {
  const {
    view,
    title,
    subtitle,
    description,
    text,
    imagesBundles,
    downloadLink,
    appBackgroundImageUrl,
    appLogoUrl,
    sectionStyle,
    slug,
  } = getItemPreviewProps(data);

  return (
    <section
      style={sectionStyle}
      className={cn(styles.previewContainer, styles[type], styles[view], styles[slug])}
    >
      <div className={styles.projectPreview}>
        <div className={styles.projectInfoContainer}>
          {appLogoUrl && (
            <img
              className={styles.logo}
              src={appLogoUrl}
              alt={appLogoUrl}
            />
          )}
          <TitleText
            type={slug}
            data={title}
          />
          {subtitle && (
            <p className={styles.projectSubtitle}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={styles.projectDescription}>
              {description}
            </p>
          )}
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
              key={`images-bundles/${bundleUrl}`}
              className={styles.imageBundle}
              src={bundleUrl}
              alt={title}
            />
          );
        })}
      </div>
    </section>
  );
};

ItemPreview.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
