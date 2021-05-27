import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export const FullLayout = ({
  children,
  isMaxWidthDisabled,
  isSidePaddingDisabledDesktop,
  isSidePaddingDisabledTablet,
  isSidePaddingDisabledPhone,
  isTopPaddingDisabledDesktop,
  isTopPaddingDisabledTablet,
  isTopPaddingDisabledPhone,
  isBottomPaddingDisabledDesktop,
  isBottomPaddingDisabledTablet,
  isBottomPaddingDisabledPhone,
}) => (
  <div className={cn(styles.fullLayout, {
    [styles.disableMaxWidth]: isMaxWidthDisabled,
    [styles.disableSidePaddingDesktop]: isSidePaddingDisabledDesktop,
    [styles.disableSidePaddingTablet]: isSidePaddingDisabledTablet,
    [styles.disableSidePaddingPhone]: isSidePaddingDisabledPhone,
    [styles.disableTopPaddingDesktop]: isTopPaddingDisabledDesktop,
    [styles.disableTopPaddingTablet]: isTopPaddingDisabledTablet,
    [styles.disableTopPaddingPhone]: isTopPaddingDisabledPhone,
    [styles.disableBottomPaddingDesktop]: isBottomPaddingDisabledDesktop,
    [styles.disableBottomPaddingTablet]: isBottomPaddingDisabledTablet,
    [styles.disableBottomPaddingPhone]: isBottomPaddingDisabledPhone,
  })}
  >
    {children}
  </div>
);

FullLayout.defaultProps = {
  children: {},
  isMaxWidthDisabled: false,
  isSidePaddingDisabledDesktop: false,
  isSidePaddingDisabledTablet: false,
  isSidePaddingDisabledPhone: false,
  isTopPaddingDisabledDesktop: false,
  isTopPaddingDisabledTablet: false,
  isTopPaddingDisabledPhone: false,
  isBottomPaddingDisabledDesktop: false,
  isBottomPaddingDisabledTablet: false,
  isBottomPaddingDisabledPhone: false,
};

FullLayout.propTypes = {
  children: PropTypes.instanceOf(Object),
  isMaxWidthDisabled: PropTypes.bool,
  isSidePaddingDisabledDesktop: PropTypes.bool,
  isSidePaddingDisabledTablet: PropTypes.bool,
  isSidePaddingDisabledPhone: PropTypes.bool,
  isTopPaddingDisabledDesktop: PropTypes.bool,
  isTopPaddingDisabledTablet: PropTypes.bool,
  isTopPaddingDisabledPhone: PropTypes.bool,
  isBottomPaddingDisabledDesktop: PropTypes.bool,
  isBottomPaddingDisabledTablet: PropTypes.bool,
  isBottomPaddingDisabledPhone: PropTypes.bool,
};
