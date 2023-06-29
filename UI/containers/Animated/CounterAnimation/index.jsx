import React from 'react';
import { useSpring, animated } from 'react-spring';

const CounterAnimation = ({
  children,
  className,
}) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: +children,
    delay: 500,
    loop: true,
    config: {
      mass: 1,
      tension: 15,
      friction: 10,
    },
  });

  return (
    <animated.h3 className={className}>
      {number.to((n) => n.toFixed(0))}
    </animated.h3>
  );
};

export default CounterAnimation;
