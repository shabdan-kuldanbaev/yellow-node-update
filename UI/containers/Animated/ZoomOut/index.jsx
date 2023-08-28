import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const ZoomOut = (props) => {
  const {
    children,
    className,
    delay,
  } = props;

  const [style, api] = useSpring(() => ({
    from: {
      scale: 2,
      opacity: 0,
    },
    to: {
      scale: 1,
      opacity: 1,
    },
    delay,
    config: {
      mass: 2,
      tension: 80,
    },
  }));

  return (
    <animated.div
      style={style}
      className={className}
    >
      {children}
    </animated.div>
  );
};

export default ZoomOut;
