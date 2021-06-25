import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const Logo = ({ type }) => (
  <LinkWrapper
    className={styles[type]}
    isLocalLink
    path={ROUTES.homepage.path}
    dynamicRouting={ROUTES.homepage.dynamicPath}
  >
    <Svg
      className={styles.logo}
      type={SVG_IMAGES_TYPES.yellowLogo}
    />
    <Svg
      className={styles.text}
      type={SVG_IMAGES_TYPES.yellowLogoText}
    />
  </LinkWrapper>
);

Logo.defaultProps = {
  type: 'default',
};

Logo.propTypes = {
  type: PropTypes.string,
};

export default Logo;
