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
      <div className="item">
        <Typography
          size={TYPOGRAPHY_SIZE.paragrapgh16}
          className={styles.contactHeadline}
        >
          Phones:
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

      </div>

      <div className="item">
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
                key={sm.link}
              >
                <Svg type={sm.iconDark} />
              </LinkWrapper>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Contacts;
