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
    telephoneNumbers,
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
        {telephoneNumbers && telephoneNumbers.map((telephoneNumber) => (
          <LinkWrapper
            path={`tel:${telephoneNumber}`}
            isLocalLink
            googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
            key={`contacts/phone/${telephoneNumber}`}
          >
            {telephoneNumber}
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
          key={`contacts/email/${email}`}
        >
          {email}
        </LinkWrapper>
      </div>
    );
  default: null;
  }

  return null;
};

FieldsWrapper.propTypes = {
  animated: PropTypes.shape({
    field: PropTypes.string.isRequired,
  }).isRequired,
};
