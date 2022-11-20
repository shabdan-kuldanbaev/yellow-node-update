import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import LinkWrapper from 'components/Common/LinkWrapper';
import { TitleText } from './TitleText';
import { useItemPreview } from './utils/useItemPreview';
import styles from './styles.module.scss';

const ItemPreview = ({ data, type }) => {
  const {
    view,
    title,
    subtitle,
    description,
    text,
    imagesBundlesUrl,
    appBackgroundImageUrl,
    appLogoUrl,
    sectionStyle,
    slug,
    link,
  } = useItemPreview(data);

  console.log('slug', slug);

  return (
    <LinkWrapper path={link}>
      <section
        style={sectionStyle}
        className={cn(
          styles.previewContainer,
          styles[type],
          styles[view],
          styles[slug],
        )}
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
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={appBackgroundImageUrl}
              alt={appBackgroundImageUrl}
            />
          </div>
          {imagesBundlesUrl?.map((bundleUrl) => (
            <img
              key={`images-bundles/${bundleUrl}`}
              className={styles.imageBundle}
              src={bundleUrl}
              alt={title}
            />
          ))}
        </div>
      </section>
    </LinkWrapper>
  );
};

ItemPreview.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemPreview;
