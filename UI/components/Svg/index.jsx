'use client';

import {
  useEffect,
  useState,
  createElement,
} from 'react';
import PropTypes from 'prop-types';
import * as icons from './svgs';

const Svg = ({
  type,
  className,
  handleOnClick,
  ...props
}) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    const loadSvg = async () => {
      if (icons?.[type]) {
        const dynamicIcon = (await import(`./svgs${icons?.[type]}`)).default;

        setIcon(() => dynamicIcon);
      }
    };

    loadSvg();
  }, [type]);

  return (Icon

    ? createElement(
      Icon,
      {
        className,
        onClick: handleOnClick,
        ...props,
      },
      undefined,
    )
    : null);
};

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
