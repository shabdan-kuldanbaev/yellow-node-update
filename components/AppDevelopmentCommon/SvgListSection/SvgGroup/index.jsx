import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/Common/Svg';
import { getSvgGroupProps } from '../utils/svgHelper';

const SvgGroup = ({
  data,
  animatedProps,
  className,
  listWrapperClassName,
  isMobileResolution,
}) => {
  const { title, contentList: technologies } = getSvgGroupProps(data);

  return (
    <div className={listWrapperClassName}>
      {title && <h3>{title}</h3>}
      <div className={className}>
        {technologies && technologies.map((technology, i) => {
          if (isMobileResolution) {
            return (
              <div key={`technologies/${technology}`}>
                <Svg type={technology} />
              </div>
            );
          }

          return (
            <Animated
              key={`technologies/${technology}`}
              {...animatedProps}
              transitionDelay={300 + 50 * i}
            >
              <Svg type={technology} />
            </Animated>
          );
        })}
      </div>
    </div>
  );
};

SvgGroup.defaultProps = {
  className: '',
  listWrapperClassName: '',
  isMobileResolution: false,
};

SvgGroup.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  animatedProps: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  listWrapperClassName: PropTypes.string,
  isMobileResolution: PropTypes.bool,
};

export default SvgGroup;
