import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import { getFileUrl } from 'utils/helper';
import { getAppstoreSvgType, getItemPreviewProps } from './utils/itemPreviewHelper';
import styles from './styles.module.scss';

export const ItemPreview = ({ data, type }) => {
  const {
    view,
    slug,
    title,
    subtitle,
    description,
    text,
    imagesBundles,
    downloadLink,
    appBackgroundImageUrl,
    appLogoUrl,
    sectionStyle,
  } = getItemPreviewProps(data);

  return (
    <section
      style={sectionStyle}
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
    </section>
  );
};

ItemPreview.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
