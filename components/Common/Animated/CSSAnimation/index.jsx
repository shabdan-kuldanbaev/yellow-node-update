import React from 'react';
import PropTypes from 'prop-types';
import { useIntersectionItem } from 'utils/hooks';

export const CSSAnimation = ({ children, intersectedClasses }) => {
  const [intersectRef, isIntersected] = useIntersectionItem(0.2);

  if (isIntersected) {
    return React.Children.map(children, (child) => React.cloneElement(child, {
      className: `${child.props.className} ${intersectedClasses}`,
    }));
  }

  return React.Children.map(children, (child) => React.cloneElement(child, {
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
