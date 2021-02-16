import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

const ButtonMore = ({
  href,
  dynamicRouting,
  title,
  buttonStyle,
  handleOnClick,
  buttonRef,
  isDisabled,
  disabledButtonStyle,
}) => (href.length === 0
  ? (
    <div
      ref={buttonRef}
      className={cn({ [buttonStyle]: buttonStyle })}
      onClick={handleOnClick}
    >
      {title}
    </div>
  )
  : (
    <LinkWrapper
      isLocalLink
      path={href}
      dynamicRouting={dynamicRouting}
      className={cn(styles.link, { [disabledButtonStyle]: isDisabled })}
    >
      <div className={cn({ [buttonStyle]: buttonStyle })} onClick={handleOnClick}>
        {title}
      </div>
    </LinkWrapper>
  ));

ButtonMore.defaultProps = {
  href: '',
  dynamicRouting: '',
  buttonStyle: null,
  buttonRef: null,
  handleOnClick: null,
  isDisabled: false,
  disabledButtonStyle: null,
};

ButtonMore.propTypes = {
  href: PropTypes.string,
  dynamicRouting: PropTypes.string,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  handleOnClick: PropTypes.func,
  buttonRef: PropTypes.instanceOf(Object),
  isDisabled: PropTypes.bool,
  disabledButtonStyle: PropTypes.string,
};

export default ButtonMore;
