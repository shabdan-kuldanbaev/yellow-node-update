import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import LinkWrapper from 'components/Common/LinkWrapper';
import {
  EMAIL_LINK,
  PHONE_NUMBER,
  SOCIAL_MEDIA,
} from 'utils/constants/contacts';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

export const FieldsWrapper = ({ animated: { field } }) => {
  const { pathname } = useRouter();

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
        {Object.values(PHONE_NUMBER).map((telephoneNumber) => (
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
          key={`contacts/email/${EMAIL_LINK}`}
          path={`mailto:${EMAIL_LINK}`}
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Email' }}
        >
          {EMAIL_LINK}
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
        {Object.values(SOCIAL_MEDIA)
          .filter((item) => item.id !== 'dribbble')
          .map(({
            iconDark: type,
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
