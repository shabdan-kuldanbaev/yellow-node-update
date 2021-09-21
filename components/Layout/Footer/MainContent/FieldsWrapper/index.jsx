import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import styles from 'components/Layout/Footer/MainContent/styles.module.scss';

export const FieldsWrapper = ({
  type,
  path,
  subtitle,
}) => {
  switch (type) {
  case 'phone':
    return (
      <LinkWrapper
        path={path}
        isLocalLink
        googleAnalyticProps={{
          action: 'Click',
          data: 'Phone',
        }}
      >
        {subtitle}
      </LinkWrapper>
    );
  case 'email':
    return (
      <LinkWrapper
        path={path}
        isLocalLink
        googleAnalyticProps={{
          action: 'Click',
          data: 'Email',
        }}
        className={styles.email}
      >
        <span>{subtitle}</span>
      </LinkWrapper>
    );
  case 'navigation':
    return (
      <LinkWrapper
        path={path}
        isLocalLink
      >
        {subtitle}
      </LinkWrapper>
    );
  default:
    return null;
  }
};

FieldsWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
