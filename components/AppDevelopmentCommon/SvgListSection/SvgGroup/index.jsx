import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Svg from 'components/Common/Svg';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getSvgGroupProps } from '../utils/svgHelper';

const Animated = dynamic(() => import('components/Common/Animated'));

const SvgGroup = ({
  data,
  className,
  listWrapperClassName,
  isMobileResolution,
}) => {
  const { title, contentList: technologies } = getSvgGroupProps(data);

  return (
    <div className={listWrapperClassName}>
      {title && <h3>{title}</h3>}
      <div className={className}>
        {technologies?.map((technology, i) => {
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
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={300 + 70 * i}
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
  className: PropTypes.string,
  listWrapperClassName: PropTypes.string,
  isMobileResolution: PropTypes.bool,
};

export default SvgGroup;
