import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'UI/components/LinkWrapper';
import Svg from 'UI/components/Svg';
import { ROUTES } from 'utils/constants';
import { useLogo } from './utils/useLogo';
import styles from './styles.module.scss';

const Logo = (props) => {
  const {
    svgLogoType,
    svgTextLogoType,
  } = useLogo(props);

  return (
    <LinkWrapper
      path={ROUTES.homepage.path}
      className={styles.linkWrapper}
    >
      <Svg
        type={svgLogoType}
        className={styles.logoImage}
      />
      <Svg
        type={svgTextLogoType}
        className={styles.logoText}
      />
    </LinkWrapper>
  );
};

Logo.defaultProps = {
  type: 'default',
};

Logo.propTypes = {
  type: PropTypes.string,
};

export default React.memo(Logo);
