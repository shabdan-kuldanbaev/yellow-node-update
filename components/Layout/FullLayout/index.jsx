import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export const FullLayout = ({
  children,
  disableMaxWidth,
  disableTopPadding,
  disableSidePadding,
  disableBottomPadding,
}) => {
  const layoutStyles = cn(styles.fullLayout, {
    [styles.disableMaxWidth]: disableMaxWidth,
    [styles.disableTopPadding]: disableTopPadding,
    [styles.disableSidePadding]: disableSidePadding,
    [styles.disableBottomPadding]: disableBottomPadding,
  });

  return (
    <div className={layoutStyles}>
      {children}
    </div>
  );
};

FullLayout.defaultProps = {
  children: {},
  disableMaxWidth: false,
  disableTopPadding: false,
  disableSidePadding: false,
  disableBottomPadding: false,
};

FullLayout.propTypes = {
  children: PropTypes.instanceOf(Object),
  disableMaxWidth: PropTypes.bool,
  disableTopPadding: PropTypes.bool,
  disableSidePadding: PropTypes.bool,
  disableBottomPadding: PropTypes.bool,
};
