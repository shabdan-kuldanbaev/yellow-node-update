import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

const ButtonMore = ({
  href,
  title,
  buttonStyle,
  handleOnClick,
}) => (
  <Link href={href}>
    <div className={cn({[buttonStyle]: buttonStyle})} onClick={handleOnClick}>
      {title}
    </div>
  </Link>
);

ButtonMore.defaultProps = {
  buttonStyle: null,
};

ButtonMore.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
};

export default ButtonMore;
