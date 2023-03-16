import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionItem } from 'hooks/useIntersectionItem';

export const CSSAnimation = ({ children, intersectedClasses }) => {
  const [intersectRef, isIntersected] = useIntersectionItem(0.2);

  if (isIntersected) {
    return Children.map(children, (child) => cloneElement(child, {
      className: `${child.props.className} ${intersectedClasses}`,
    }));
  }

  return Children.map(children, (child) => cloneElement(child, {
    ref: intersectRef,
  }));
};

CSSAnimation.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  intersectedClasses: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
