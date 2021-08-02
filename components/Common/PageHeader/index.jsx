import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated, Breadcrumbs } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const PageHeader = ({ title, breadcrumbs }) => (
  <Fragment>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    {title && (
      <div
        className={styles.titleContainer}
        data-page-title
      >
        <Animated
          type={ANIMATED_TYPE.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={250}
        >
          <h1>{title}</h1>
        </Animated>
      </div>
    )}
  </Fragment>
);

PageHeader.defaultProps = {
  title: '',
  breadcrumbs: null,
};

PageHeader.propTypes = {
  title: PropTypes.string,
  breadcrumbs: PropTypes.instanceOf(Array),
};
