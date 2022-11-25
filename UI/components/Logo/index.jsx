import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'UI/components/LinkWrapper';
import Svg from 'UI/components/Svg';
import { ROUTES } from 'utils/constants';
import { useLogo } from './utils/useLogo';

const Logo = (props) => {
  const {
    svgLogoType,
    svgTextLogoType,
  } = useLogo(props);

  return (
    <LinkWrapper path={ROUTES.homepage.path}>
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
