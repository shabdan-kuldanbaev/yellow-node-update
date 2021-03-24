import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import { CONTACTS_DATA } from 'utils/constants';
import styles from './styles.module.scss';

export const FieldsWrapper = ({ animated: { field } }) => {
  const {
    country,
    city,
    streetAddress,
    postalCode,
    telephones,
    email,
  } = CONTACTS_DATA;

  switch (field) {
  case 'contact':
    return <span className={styles.addressTitle}>CONTACT US</span>;
  case 'locationAdress':
    return (
      <div className={styles.locationAddress}>
        <span>{`${streetAddress} ${city}`}</span>
        <span>{`${postalCode} ${country}`}</span>
      </div>
    );
  case 'phones':
    return <span className={styles.addressTitle}>PHONES</span>;
  case 'phoneNumber':
    return (
      <div className={styles.phoneNumber}>
        {telephones && telephones.map((telephone) => (
          <LinkWrapper
            path={`tel:${telephone}`}
            isLocalLink
            googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
          >
            {telephone}
          </LinkWrapper>
        ))}
      </div>
    );
  case 'emailTitle':
    return <span className={styles.addressTitle}>EMAIL</span>;
  case 'email':
    return (
      <div className={styles.email}>
        <LinkWrapper
          path={`mailto:${email}`}
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Email' }}
        >
          {email}
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
