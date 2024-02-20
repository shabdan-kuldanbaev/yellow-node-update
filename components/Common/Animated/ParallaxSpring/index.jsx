import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'store/selectors/layout';
import cn from 'classnames';

const ParallaxWrapper = ({
  children = null,
  className = null,
  elementRef = null,
  position = '',
  speed = 0,
  isHomepageIntro = false,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);
  const containerRef = useRef(null);
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));
  const calc = (o) => `translateY(${o * (isHomepageIntro ? speed : 0.09)}px)`;
  const classNames = cn({ [className]: className });
  const style = {
    position: position || 'absolute',
    transform: offset.to(calc),
  };

  useEffect(() => {
    const handleOnScroll = () => {
      const { current: container } = isHomepageIntro ? elementRef : containerRef;
      const { pageYOffset } = window;

      if (container) {
        const { top: elemYOffset } = container.getBoundingClientRect();

        if (isHomepageIntro) {
          if (!isMobileResolution) {
            const resultOffset = pageYOffset <= 0 ? 0 : pageYOffset - elemYOffset;

            set({ offset: resultOffset });
          }
        } else {
          set({ offset: elemYOffset });
        }
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [
    elementRef,
    isHomepageIntro,
    set,
    isMobileResolution,
  ]);

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

ParallaxWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  elementRef: PropTypes.instanceOf(Object),
  position: PropTypes.string,
  speed: PropTypes.number,
  isHomepageIntro: PropTypes.bool,
};

export default ParallaxWrapper;
