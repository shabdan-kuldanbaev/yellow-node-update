import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/AppDevelopmentCommon/Svg';

const CardImage = ({
  imageUrl,
  svgType,
  className,
}) => {
  switch (true) {
  case !!imageUrl: {
    return (
      <div className={className}>
        <div style={{ backgroundImage: `url(${imageUrl})` }} />
      </div>
    );
  }
  default: {
    return (
      <div className={className}>
        <Svg type={svgType} />
      </div>
    );
  }
  }
};

CardImage.defaultProps = {
  imageUrl: '',
  svgType: '',
};

CardImage.propTypes = {
  imageUrl: PropTypes.string,
  svgType: PropTypes.string,
  className: PropTypes.string.isRequired,
};

export default CardImage;
