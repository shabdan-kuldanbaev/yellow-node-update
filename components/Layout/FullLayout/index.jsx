import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export const FullLayout = ({
  children,
  disableMaxWidth,
  disableTopPadding,
  disableSidePadding,
}) => {
  const layoutStyles = cn(styles.fullLayout, {
    [styles.disableMaxWidth]: disableMaxWidth,
    [styles.disableTopPadding]: disableTopPadding,
    [styles.disableSidePadding]: disableSidePadding,
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
};

FullLayout.propTypes = {
  children: PropTypes.instanceOf(Object),
  disableMaxWidth: PropTypes.bool,
  disableTopPadding: PropTypes.bool,
  disableSidePadding: PropTypes.bool,
};
