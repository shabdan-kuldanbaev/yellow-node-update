import PropTypes from 'prop-types';
import { useIntersectionItem } from 'hooks/useIntersectionItem';

export const CustomAnimation = ({
  children,
  translateX = '0',
  translateY = '10px',
  opasityDuration = 0.05,
  transformDuration = 0.1,
  transitionDelay = 500,
  percentIntersection = 0.2,
}) => {
  const [intersectRef, isIntersected] = useIntersectionItem(percentIntersection);
  const delayInSeconds = transitionDelay / 1000;
  const appearanceStyles = {
    opacity: '1',
    transform: 'translate(0px, 0px)',
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.165, 0.84, 0.44, 1)',
    transitionDuration: `${opasityDuration}s, ${transformDuration}s`,
    transitionDelay: `${delayInSeconds}s`,
  };
  const generalStyles = {
    opacity: '0',
    transform: `translate(${translateX}, ${translateY})`,
    ...(isIntersected ? appearanceStyles : {}),
  };

  return (
    <div
      ref={intersectRef}
      style={generalStyles}
    >
      {children}
    </div>
  );
};

CustomAnimation.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  translateX: PropTypes.string,
  translateY: PropTypes.string,
  opasityDuration: PropTypes.number,
  transformDuration: PropTypes.number,
  transitionDelay: PropTypes.number,
  percentIntersection: PropTypes.number,
};
