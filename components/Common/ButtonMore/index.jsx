import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

const ButtonMore = ({
  href,
  title,
  buttonStyle,
  handleOnClick,
  buttonRef,
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
      path={href}
      isLocalLink
      className={styles.link}
    >
      <div className={cn({ [buttonStyle]: buttonStyle })} onClick={handleOnClick}>
        {title}
      </div>
    </LinkWrapper>
  ));

ButtonMore.defaultProps = {
  href: '',
  buttonStyle: null,
  buttonRef: null,
  handleOnClick: null,
};

ButtonMore.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  handleOnClick: PropTypes.func,
  buttonRef: PropTypes.instanceOf(Object),
};

export default ButtonMore;
