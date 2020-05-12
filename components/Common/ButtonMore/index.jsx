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
}) => (href.length === 0
  ? (
    <div className={cn({ [buttonStyle]: buttonStyle })} onClick={handleOnClick}>
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
};

ButtonMore.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
};

export default ButtonMore;
