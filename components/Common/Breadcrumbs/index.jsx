import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { isObject } from 'lodash';
import { Animated, LinkWrapper } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Breadcrumbs = ({ breadcrumbs, breadcrumbsStyles }) => (breadcrumbs
  ? (
    <div
      aria-label="breadcrumbs"
      className={cn(styles.breadcrumbs, { [breadcrumbsStyles]: breadcrumbsStyles })}
    >
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={150}
      >
        <ol>
          <li>
            <LinkWrapper
              path="/"
              isLocalLink
            >
              Home
            </LinkWrapper>
          </li>
          {breadcrumbs.map((breadcrumb) => {
            const linkProps = isObject(breadcrumb.to) ? {
              path: breadcrumb.to.path,
              dynamicRouting: breadcrumb.to.dynamicPath,
            } : {
              path: breadcrumb.to,
            };

            return (
              <li key={breadcrumb.to}>
                <LinkWrapper
                  {...linkProps}
                  isLocalLink
                >
                  {breadcrumb.title}
                </LinkWrapper>
              </li>
            );
          })}
        </ol>
      </Animated>
    </div>
  ) : null);

Breadcrumbs.defaultProps = {
  breadcrumbsStyles: '',
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.instanceOf(Array).isRequired,
  breadcrumbsStyles: PropTypes.string,
};

export default Breadcrumbs;
