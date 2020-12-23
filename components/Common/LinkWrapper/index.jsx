import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export const LinkWrapper = ({
  isLocalLink,
  path,
  dynamicRouting,
  isImage,
  imageUrl,
  imageText,
  className,
  children,
  additionalProps,
  handleOnClick,
}) => (
  <Link prefetch={false} href={dynamicRouting.length > 0 ? dynamicRouting : path} as={path}>
    <a
      className={cn(styles.link, { [className]: !isImage })}
      href={path}
      target={isLocalLink ? '' : '_blank'}
      rel={isLocalLink ? '' : 'noopener noreferrer'}
      onClick={handleOnClick}
      {...additionalProps}
    >
      {!isImage ? children : (
        <div>
          <img
            data-target="test"
            className={cn({ [className]: isImage })}
            src={imageUrl}
            alt={imageText}
          />
        </div>
      )}
    </a>
  </Link>
);

LinkWrapper.defaultProps = {
  path: '',
  isLocalLink: false,
  isImage: false,
  imageUrl: '',
  imageText: '',
  className: '',
  dynamicRouting: '',
  children: null,
  additionalProps: null,
  handleOnClick: null,
};

LinkWrapper.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
  isLocalLink: PropTypes.bool,
  isImage: PropTypes.bool,
  imageUrl: PropTypes.string,
  imageText: PropTypes.string,
  dynamicRouting: PropTypes.string,
  additionalProps: PropTypes.instanceOf(Object),
  handleOnClick: PropTypes.func,
};
