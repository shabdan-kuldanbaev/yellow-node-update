import React from 'react';
import PropTypes from 'prop-types';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { logoSize } from 'styles/utils/_variables.scss';
import * as Icon from './svgs';

export const Svg = ({
  type,
  className,
  handleOnClick: onClick,
  ...props
  // TODO: remove console log, keep it here until testing icons after refactoring
}) => ((Icon[type] || console.log({ type })) ? React.createElement(Icon[type],
  {
    className,
    onClick,
    width: type === SVG_IMAGES_TYPES.yellowLogoText ? logoSize : undefined,
    ...props,
  },
  undefined) : null);

Svg.defaultProps = {
  className: '',
  handleOnClick: undefined,
};

Svg.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleOnClick: PropTypes.func,
};
