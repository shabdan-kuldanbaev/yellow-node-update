import React, {
  useRef,
  useEffect,
  Fragment,
} from 'react';
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

  useEffect(() => {
    const handleOnScroll = () => {
      const { current: container } = isHomepageIntro ? elementRef : containerRef;
      const { top: elemYOffset } = container.getBoundingClientRect();
      const { pageYOffset } = window;

      if (isHomepageIntro) {
        if (pageYOffset <= 0) {
          set({ offset: 0 });
        } else {
          set({ offset: pageYOffset - elemYOffset });
        }
      } else {
        set({ offset: elemYOffset });
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <Fragment>
      {isHomepageIntro ? (
        <animated.div
          ref={children ? null : elementRef}
          className={cn({ [className]: className })}
          style={{
            position,
            transform: offset.interpolate(calc),
          }}
        >
          {children}
        </animated.div>
      ) : (
        <div
          ref={containerRef}
          className={cn({ [className]: className })}
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
      )}
    </Fragment>
  );
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
