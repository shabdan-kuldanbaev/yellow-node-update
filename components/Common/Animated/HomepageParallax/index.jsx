import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring/web.cjs';
import cn from 'classnames';

export const HomepageParallax = ({
  position,
  speed,
  className,
  children,
  containerRef,
}) => {
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));

  const calc = (o) => `translateY(${o * speed}px)`;

  useEffect(() => {
    const handleOnScroll = () => {
      const { current: container } = containerRef;
      const { pageYOffset } = window;
      const { top: elemYOffset } = container.getBoundingClientRect();

      if (pageYOffset <= 0) {
        set({ offset: 0 });
      } else {
        set({ offset: pageYOffset - elemYOffset });
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <animated.div
      ref={children ? null : containerRef}
      className={cn({ [className]: className })}
      style={{
        position,
        transform: offset.interpolate(calc),
      }}
    >
      {children}
    </animated.div>
  );
};

HomepageParallax.defaultProps = {
  className: null,
  children: null,
};

HomepageParallax.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerRef: PropTypes.instanceOf(Object).isRequired,
};
