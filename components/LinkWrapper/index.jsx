import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';

const LinkWrapper = ({
  isLocalLink,
  path,
  dynamicRouting,
  isImage,
  imageUrl,
  imageText,
  className,
  children,
}) => (
  <Link href={dynamicRouting.length > 0 ? dynamicRouting : path} as={path}>
    <a
      className={cn({ [className]: !isImage})}
      href={path}
      target={isLocalLink ? '' : '_blank'}
      rel={isLocalLink ? '' : 'noopener noreferrer'}
    >
      { isImage
        ? (
          <div>
            <img
              className={cn({ [className]: isImage })}
              src={imageUrl}
              alt={imageText}
            />
          </div>
        )
        : children
      }
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
};

export default LinkWrapper;
