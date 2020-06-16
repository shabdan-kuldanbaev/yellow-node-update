import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring/web.cjs';
import cn from 'classnames';
import styles from './styles.module.scss';

export const ParallaxWrapper = ({ children, className }) => {
  const containerRef = useRef(null);
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));

  const calc = (o) => `translateY(${o * 0.15}px)`;

  useEffect(() => {
    const handleOnScroll = () => {
      const { current: container } = containerRef;
      const elemYOffset = container.getBoundingClientRect().top;
      set({ offset: elemYOffset });
    };

    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(styles.parallaxContainer, { [className]: className })}
      style={{ position: 'relative' }}
    >
      <animated.div
        style={{
          position: 'absolute',
          transform: offset.interpolate(calc),
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

ParallaxWrapper.defaultProps = {
  className: null,
};

ParallaxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
