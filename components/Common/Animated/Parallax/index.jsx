import React from 'react';
import PropTypes from 'prop-types';
import { Parallax } from 'react-scroll-parallax';
import cn from 'classnames';

export const ParallaxContainer = ({
  yTop,
  yBottom,
  children,
  className,
}) => (
  <Parallax
    y={[`${yBottom}%`, `${-yTop}%`]}
    className={cn({ [className]: className })}
    tagOuter="figure"
  >
    {children}
  </Parallax>
);

ParallaxContainer.defaultProps = {
  yTop: 100,
  yBottom: 100,
  className: null,
};

ParallaxContainer.propTypes = {
  yTop: PropTypes.number,
  yBottom: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
