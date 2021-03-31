import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import ReactGA from 'react-ga';
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
}) => {
  const linkTarget = isLocalLink ? '' : '_blank';
  const linkRel = isLocalLink ? '' : 'noopener noreferrer';

  const handleOnClick = () => {
    if (!isEmpty(googleAnalyticProps)) {
      const {
        category,
        action,
        label,
        data,
      } = googleAnalyticProps;

      ReactGA.event({
        category: category || data,
        action: action || data,
        label: label || data,
      });
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
        target={linkTarget}
        rel={linkRel}
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
  googleAnalyticProps: PropTypes.instanceOf(Object),
};
