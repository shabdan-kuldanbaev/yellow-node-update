import React from 'react';
import PropTypes from 'prop-types';
import { TYPOGRAPHY_SIZE } from 'utils/constants';
import { useTypography, TYPOGRAPHY_TAGS } from './utils/useTypography';

const Typography = (props) => {
  const {
    TitleTag,
    classes,
    children,
    onClick,
    tabIndex,
    role,
  } = useTypography(props);

  return (
    <TitleTag
      className={classes}
      onClick={onClick}
      tabIndex={tabIndex}
      role={role}
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
  onClick: PropTypes.func,
  tabIndex: PropTypes.string,
  role: PropTypes.string,
};

export default Typography;
