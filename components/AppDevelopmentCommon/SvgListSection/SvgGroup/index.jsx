import React from 'react';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/AppDevelopmentCommon/Svg';
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
        {technologies.map((technology, i) => {
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

export default SvgGroup;
