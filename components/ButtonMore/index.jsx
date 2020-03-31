import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

const ButtonMore = ({
  href,
  title,
  buttonStyle,
}) => (
  <Link href={href}>
    <div className={cn({[buttonStyle]: buttonStyle})}>
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
  buttonStyle: PropTypes.string.isRequired,
};

export default ButtonMore;
