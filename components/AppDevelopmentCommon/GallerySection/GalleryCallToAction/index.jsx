import React from 'react';
import { CallToAction } from 'components/Common/CallToAction';
import { ROUTES } from 'utils/constants';
import styles from 'components/AppDevelopmentCommon/GallerySection/styles.module.scss';

export const GalleryCallToAction = ({
  slug,
  title,
  linkTitle,
  buttonTitle,
  handleOnCTAClick,
}) => {
  switch (slug) {
  case ROUTES.customChatApp.slug:
  case ROUTES.customMobileApp.slug:
  case ROUTES.customWebApp.slug:
    return linkTitle && buttonTitle && (
      <CallToAction
        type="card"
        title={linkTitle}
        buttonTitle={buttonTitle}
        className={styles.callToAction}
        handleOnClick={handleOnCTAClick}
      />
    );
  case ROUTES.designServices.slug:
    return (
      <div>
        <h3>{title}</h3>
        <div>
          {/* {links && links.map(() => {

          })} */}
        </div>
      </div>
    );
  default:
    return null;
  }
};
