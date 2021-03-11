import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring/web.cjs';
import cn from 'classnames';

export const ParallaxWrapper = ({
  children,
  className,
  elementRef,
  position,
  speed,
  isHomepageIntro,
}) => {
  const containerRef = useRef(null);
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));
  const calc = (o) => `translateY(${o * (isHomepageIntro ? speed : 0.09)}px)`;
  const classNames = cn({ [className]: className });
  const style = {
    position: position || 'absolute',
    transform: offset.interpolate(calc),
  };

  useEffect(() => {
    const handleOnScroll = () => {
      const { current: container } = isHomepageIntro ? elementRef : containerRef;
      const { pageYOffset } = window;

      if (container) {
        const { top: elemYOffset } = container.getBoundingClientRect();

        if (isHomepageIntro) {
          const offset = pageYOffset <= 0 ? 0 : pageYOffset - elemYOffset;

          set({ offset });
        } else {
          set({ offset: elemYOffset });
        }
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  switch (isHomepageIntro) {
  case true:
    return (
      <animated.div
        ref={children ? null : elementRef}
        className={classNames}
        style={style}
      >
        {children}
      </animated.div>
    );
  default:
    return (
      <div
        ref={containerRef}
        className={classNames}
        style={{ position: 'relative' }}
      >
        <animated.div style={style}>
          {children}
        </animated.div>
      </div>
    );
  }
};

ParallaxWrapper.defaultProps = {
  className: null,
  elementRef: null,
  position: '',
  speed: 0,
  isHomepageIntro: false,
};

ParallaxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  elementRef: PropTypes.instanceOf(Object),
  position: PropTypes.string,
  speed: PropTypes.number,
  isHomepageIntro: PropTypes.bool,
};
