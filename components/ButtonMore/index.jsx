import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

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
    <Link href={href}>
      <div className={cn({ [buttonStyle]: buttonStyle })} onClick={handleOnClick}>
        {title}
      </div>
    </Link>
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
