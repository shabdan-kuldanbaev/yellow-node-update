import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isObject from 'lodash/isObject';
import Animated from 'components/Common/Animated';
import LinkWrapper from 'components/Common/LinkWrapper';
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
            const linkProps = {
              path: breadcrumb.to,
            };

            if (isObject(breadcrumb.to)) {
              const { path, dynamicPath } = breadcrumb.to;
              linkProps.path = path;
              linkProps.dynamicPath = dynamicPath;
            }

            return (
              <li key={linkProps.path}>
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
