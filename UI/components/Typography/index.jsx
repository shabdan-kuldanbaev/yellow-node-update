import React from 'react';
import PropTypes from 'prop-types';
import { TYPOGRAPHY_SIZE } from 'utils/constants';
import { TYPOGRAPHY_TAGS } from './utils';
import { useTypography } from './useTypography';

const Typography = (props) => {
  const {
    TitleTag, classes, children,
  } = useTypography(props);

  return (
    <TitleTag
      className={classes}
    >
      {children}
    </TitleTag>
  );
};

Typography.defaultProps = {
  className: '',
  variant: TYPOGRAPHY_TAGS.p,
  size: TYPOGRAPHY_SIZE.paragrapghM,
  isBold: false,
};

Typography.propTypes = {
  isBold: PropTypes.bool,
  variant: PropTypes.string,
  align: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Typography;
