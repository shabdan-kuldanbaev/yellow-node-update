import { useMemo } from 'react';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import gaHelper from 'utils/ga';
import { CUSTOM_DOMAIN } from 'utils/constants';
import { isAbsoluteUrl } from './helpers';
import styles from '../styles.module.scss';

export default (props) => {
  const {
    path,
    className: classNames,
    children,
    googleAnalyticProps,
    isSocialLink,
    onClick,
  } = props;

  const className = cn(styles.link, classNames);

  const isAbsoluteLink = useMemo(() => isAbsoluteUrl(path), [path]);
  const isLocalLink = !isAbsoluteLink || path.includes(CUSTOM_DOMAIN);

  const href = (!isAbsoluteLink && path && path[0] !== '/') ? `/${path}` : path;
  const target = !isLocalLink ? '_blank' : undefined;
  const rel = (isSocialLink || isLocalLink) ? undefined : 'noopener noreferrer nofollow';

  const handleOnClick = onClick && ((e) => {
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
  });

  return {
    className,
    target,
    rel,
    href,
    handleOnClick,
    children,
  };
};
