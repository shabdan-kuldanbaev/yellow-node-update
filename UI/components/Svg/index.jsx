import React from 'react';
import PropTypes from 'prop-types';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import * as Icons from './svgs';
import * as IconsOld from './svgsOld';

const Svg = ({
  type,
  className,
  handleOnClick,
  ...props
  // TODO: remove console log, keep it here until testing icons after refactoring
}) => ((IconsOld[type] || console.log({ type })) ? React.createElement(
  IconsOld[type],
  {
    className,
    onClick: handleOnClick,
    width: type === SVG_IMAGES_TYPES.yellowLogoText ? 120 : undefined,
    ...props,
  },
  undefined,
) : null);

Svg.defaultProps = {
  className: '',
  handleOnClick: undefined,
};

Svg.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleOnClick: PropTypes.func,
};

export default Svg;
