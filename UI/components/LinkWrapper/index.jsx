import Link from 'next/link';
import PropTypes from 'prop-types';
import useLinkWrapper from './utils/useLinkWrapper';

const LinkWrapper = (props) => {
  const {
    className,
    handleOnClick,
    href,
    rel,
    target,
    children,
  } = useLinkWrapper(props);

  if (!href) {
    return children;
  }

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
        className={className}
        onClick={handleOnClick}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    </Link>
  );
};

LinkWrapper.propTypes = {
  path: PropTypes.string,
  googleAnalyticProps: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  children: PropTypes.node,
  isSocialLink: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LinkWrapper;
