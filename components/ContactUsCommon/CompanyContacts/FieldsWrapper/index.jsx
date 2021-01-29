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
        <span>Nemiga 5, Minsk, Belarus</span>
        <span>220030</span>
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
          path="tel:+375 44 584 02 08"
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
        >
          +375 44 584 02 08
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
  field: PropTypes.string.isRequired,
};
