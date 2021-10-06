import React from 'react';
import PropTypes from 'prop-types';
import { CallToAction } from 'components/Common/CallToAction';
import { Svg } from 'components/Common/Svg';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from 'components/AppDevelopmentCommon/GallerySection/styles.module.scss';

export const GalleryCallToAction = ({
  slug,
  linkData,
  handleOnCTAClick,
}) => {
  switch (slug) {
  case ROUTES.customChatApp.slug:
  case ROUTES.customMobileApp.slug:
  case ROUTES.customWebApp.slug:
    const {
      title: linkTitle,
      buttonTitle,
    } = getDocumentFields(linkData);

    if (!linkTitle || !buttonTitle) {
      return null;
    }

    return (
      <CallToAction
        type="card"
        title={linkTitle}
        buttonTitle={buttonTitle}
        className={styles.callToAction}
        handleOnClick={handleOnCTAClick}
      />
    );
  case ROUTES.designServices.slug:
    const {
      contentModules: links,
      title,
    } = getDocumentFields(linkData);

    return (
      <div className={styles.linksBlock}>
        <h3 className={styles.linksBlockTitle}>
          {title}
        </h3>
        <div className={styles.linksList}>
          {links && links.map((link) => {
            const {
              slug: linkSvgType,
              title: linkText,
              url,
            } = getDocumentFields(link);

            return (
              <div
                className={styles.linkContainer}
                key={`gallery-cta/${linkText}`}
              >
                <LinkWrapper path={url}>
                  <Svg type={linkSvgType} />
                  <p className={styles.linkText}>
                    {linkText}
                  </p>
                  <Svg
                    type={SVG_IMAGES_TYPES.nearbyArrow}
                    className={styles.arrow}
                  />
                </LinkWrapper>
              </div>
            );
          })}
        </div>
      </div>
    );
  default:
    return null;
  }
};

GalleryCallToAction.propTypes = {
  slug: PropTypes.string.isRequired,
  linkData: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func.isRequired,
};
