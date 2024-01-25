import { useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import gaHelper from 'utils/ga';
import { CUSTOM_DOMAIN } from 'utils/constants';
import { isAbsoluteUrl } from './helpers';
import styles from './styles.module.scss';

const LinkWrapper = ({
  path,
  className,
  children,
  googleAnalyticProps,
  isSocialLink,
  onClick,
}) => {
  const isAbsoluteLink = useMemo(() => isAbsoluteUrl(path), [path]);
  const isLocalLink = !isAbsoluteLink || path.includes(CUSTOM_DOMAIN);

  if (!path) {
    return children;
  }

  const target = !isLocalLink ? '_blank' : undefined;
  const rel = (isSocialLink || isLocalLink) ? undefined : 'noopener noreferrer nofollow';
  const href = (!isAbsoluteLink && path[0] !== '/') ? `/${path}` : path;

  const handleOnClick = (e) => {
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

    onClick(e);
  };

  return (
    <Link
      legacyBehavior
      href={href}
      /* TODO: if you need to instantly open pages via links in the navigation,
      you can remove this code to enable link page generation and loading. However, performance will be degraded
      more: https://nextjs.org/docs/api-reference/next/link */
      prefetch={false}
    >
      {/* eslint-disable-next-line react/jsx-no-target-blank,jsx-a11y/anchor-is-valid,jsx-a11y/no-static-element-interactions */}
      <a
        className={cn(styles.link, className)}
        onClick={handleOnClick}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    </Link>
  );
};

LinkWrapper.defaultProps = {
  path: null,
  className: null,
  googleAnalyticProps: {},
  children: null,
  isSocialLink: false,
  onClick: () => {},
};

LinkWrapper.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
  googleAnalyticProps: PropTypes.instanceOf(Object),
  children: PropTypes.node,
  isSocialLink: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LinkWrapper;
