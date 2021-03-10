import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

export const FieldsWrapper = ({ animated: { field } }) => {
  switch (field) {
  case 'contact':
    return <span className={styles.addressTitle}>CONTACT US</span>;
  case 'locationAdress':
    return (
      <div className={styles.locationAddress}>
        <span>5-303 Nemiga street Minsk</span>
        <span>220030 Belarus</span>
      </div>
    );
  case 'phones':
    return <span className={styles.addressTitle}>PHONES</span>;
  case 'phoneNumber':
    return (
      <div className={styles.phoneNumber}>
        <LinkWrapper
          path="tel:+1 415 670 9070"
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
        >
          +1 415 670 9070
        </LinkWrapper>
        <LinkWrapper
          path="tel:+375 29 311 52 49"
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
        >
          +375 29 311 52 49
        </LinkWrapper>
      </div>
    );
  case 'emailTitle':
    return <span className={styles.addressTitle}>EMAIL</span>;
  case 'email':
    return (
      <div className={styles.email}>
        <LinkWrapper
          path="mailto:hi@yellow.systems"
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Email' }}
        >
          hi@yellow.systems
        </LinkWrapper>
      </div>
    );
  default: null;
  }
};

FieldsWrapper.propTypes = {
  animated: PropTypes.shape({
    field: PropTypes.string.isRequired,
  }).isRequired,
};
