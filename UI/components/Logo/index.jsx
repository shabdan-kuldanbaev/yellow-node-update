import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'UI/components/Svg';
import { ROUTES } from 'utils/constants';
import { useLogo } from './utils/useLogo';

const Logo = (props) => {
  const {
    svgLogoType,
    svgTextLogoType,
  } = useLogo(props);

  return (
    <LinkWrapper
      isLocalLink
      path={ROUTES.homepage.path}
      dynamicRouting={ROUTES.homepage.dynamicPath}
    >
      <Svg
        type={svgLogoType}
      />
      <Svg
        type={svgTextLogoType}
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
