import cn from 'classnames';
import Typography from 'UI/components/Typography';
import LinkWrapper from 'UI/components//LinkWrapper';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import { EMAIL_LINK, PHONE_NUMBER, SOCIAL_MEDIA } from 'utils/constants/contacts';
import Svg from 'UI/components/Svg';
import styles from './Contacts.module.scss';

function Contacts({ className }) {
  return (
    <div className={cn(className)}>
      <Typography
        size={TYPOGRAPHY_SIZE.paragrapgh16}
        className={styles.contactHeadline}
      >
        Phone:
      </Typography>

      <LinkWrapper
        path={`tel:${PHONE_NUMBER.us}`}
      >
        <Typography
          size={TYPOGRAPHY_SIZE.headline20}
          className={styles.contact}
          isBold
        >
          {PHONE_NUMBER.us}
        </Typography>
      </LinkWrapper>

      <Typography
        size={TYPOGRAPHY_SIZE.paragrapgh16}
        className={styles.contactHeadline}
      >
        Email:
      </Typography>

      <LinkWrapper
        path={`mailto:${EMAIL_LINK}`}
      >
        <Typography
          size={TYPOGRAPHY_SIZE.headline20}
          className={styles.contact}
          isBold
        >
          {EMAIL_LINK}
        </Typography>
      </LinkWrapper>

      <Typography
        size={TYPOGRAPHY_SIZE.paragrapgh16}
        className={styles.contactHeadline}
      >
        Follow:
      </Typography>

      <div className={styles.smList}>
        {
          Object.values(SOCIAL_MEDIA).filter((sm) => sm.id !== 'dribbble').map((sm) => (
            <LinkWrapper
              path={sm.link}
              className={styles.smItem}
            >
              <Svg type={sm.iconDark} />
            </LinkWrapper>
          ))
        }
      </div>
    </div>
  );
}

export default Contacts;
