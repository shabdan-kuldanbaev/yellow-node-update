import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import gaHelper from 'utils/ga';
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
  googleAnalyticProps,
  isSocialLink,
}) => {
  const handleOnClick = () => {
    if (!isEmpty(googleAnalyticProps)) {
      const {
        category,
        action,
        label,
        data,
      } = googleAnalyticProps;

      gaHelper.trackEvent(
        category || data,
        action || data,
        label || data,
      );
    }
  };

  return (
    <Link
      prefetch={false}
      href={dynamicRouting.length > 0 ? dynamicRouting : path}
      as={path}
    >
      <a
        className={cn(styles.link, { [className]: !isImage })}
        href={path}
        target={`${isLocalLink ? '' : '_blank'}`}
        rel={`${isLocalLink ? '' : `noopener noreferrer ${isSocialLink ? '' : 'nofollow'}`}`}
        onClick={handleOnClick}
      >
        {!isImage ? children : (
          <div>
            <img
              className={cn({ [className]: isImage })}
              src={imageUrl}
              alt={imageText}
            />
          </div>
        )}
      </a>
    </Link>
  );
};

LinkWrapper.defaultProps = {
  path: '',
  isLocalLink: false,
  isImage: false,
  imageUrl: '',
  imageText: '',
  className: '',
  dynamicRouting: '',
  children: null,
  googleAnalyticProps: {},
  isSocialLink: false,
};

LinkWrapper.propTypes = {
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]),
  className: PropTypes.string,
  isLocalLink: PropTypes.bool,
  isImage: PropTypes.bool,
  imageUrl: PropTypes.string,
  imageText: PropTypes.string,
  dynamicRouting: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]),
  googleAnalyticProps: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
  isSocialLink: PropTypes.bool,
};
