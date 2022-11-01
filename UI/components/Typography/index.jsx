import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { TYPOGRAPHY_SIZE } from 'utils/constants';
import { TYPOGRAPHY_TAGS } from './utils';
import styles from './styles.module.scss';

const Typography = ({
  variant,
  align,
  isBold,
  className,
  children,
  size,
}) => {
  const TitleTag = TYPOGRAPHY_TAGS[variant];
  const classes = cn(className, styles[size], {
    [styles.boldText]: isBold,
  });

  return (
    <TitleTag
      align={align}
      className={classes}
    >
      {children}
    </TitleTag>
  );
};

Typography.defaultProps = {
  align: 'inherit',
  className: '',
  variant: TYPOGRAPHY_TAGS.p,
  size: TYPOGRAPHY_SIZE.footnotesize,
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
