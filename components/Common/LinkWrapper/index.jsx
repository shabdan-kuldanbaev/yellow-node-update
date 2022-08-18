import React, { useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import gaHelper from 'utils/ga';
import styles from './styles.module.scss';
import { isExternal } from './helpers';

const LinkWrapper = ({
  path,
  className,
  children,
  googleAnalyticProps,
  isSocialLink,
  onClick,
}) => {
  const isExternalLink = useMemo(() => isExternal(path), [path]);
  const target = isExternalLink ? '_blank' : undefined;
  const rel = (isSocialLink || !isExternalLink) ? undefined : 'noopener noreferrer nofollow';

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
    <Link href={path}>
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
  path: '/',
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
