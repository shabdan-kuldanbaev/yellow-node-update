import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { LinkWrapper } from 'components';
import { Svg } from 'components/Common/Svg';
import { CONTACTS_DATA } from 'utils/constants';
import styles from './styles.module.scss';

export const FieldsWrapper = ({ animated: { field } }) => {
  const { pathname } = useRouter();
  const {
    telephoneNumbers,
    email,
    socialMedia,
  } = CONTACTS_DATA;

  switch (field) {
  case 'phones':
    return (
      <span className={styles.addressTitle}>
        Phones:
      </span>
    );
  case 'phoneNumber':
    return (
      <div className={styles.phoneNumber}>
        {telephoneNumbers && telephoneNumbers.map((telephoneNumber) => (
          <LinkWrapper
            key={`contacts/phone/${telephoneNumber}`}
            path={`tel:${telephoneNumber}`}
            isLocalLink
            googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
          >
            {telephoneNumber}
          </LinkWrapper>
        ))}
      </div>
    );
  case 'emailTitle':
    return (
      <span className={styles.addressTitle}>
        Email:
      </span>
    );
  case 'email':
    return (
      <div className={styles.email}>
        <LinkWrapper
          key={`contacts/email/${email}`}
          path={`mailto:${email}`}
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Email' }}
        >
          {email}
        </LinkWrapper>
      </div>
    );
  case 'followTitle':
    return (
      <span className={styles.addressTitle}>
        Follow:
      </span>
    );
  case 'follow':
    return (
      <div className={styles.socialMediaList}>
        {socialMedia && socialMedia.map(({
          type,
          title,
          link,
        }) => link && (
          <LinkWrapper
            key={`networks/${type}`}
            path={link}
            googleAnalyticProps={{
              action: 'Click',
              category: 'Social',
              label: pathname,
              data: title,
            }}
            isSocialLink
          >
            <Svg
              type={type}
              className={styles.svg}
            />
          </LinkWrapper>
        ))}
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
