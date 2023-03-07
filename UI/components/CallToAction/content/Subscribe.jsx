import { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import SubscribeInCTAForm from 'UI/components/Forms/SubscribeInCTAForm';
import Button from 'UI/components/Button';
import { selectIsSubscribed } from 'redux/selectors/subscription';
import styles from '../styles.module.scss';

export default ({
  titles,
  subtitle,
  onSubscribeSubmit,
  buttonTitle,
  handleOnClick,
  slug,
}) => {
  const isSubscribed = useSelector(selectIsSubscribed);

  const [isSubscribeFormShown, setSubscribeFormShown] = useState(false);

  return (
    <>
      <div className={cn(styles.content, { [styles.isSubscribed]: isSubscribed })}>
        {!isSubscribed && titles?.map((titleText, index) => (
          titleText && (
            <Typography
              variant={TYPOGRAPHY_TAGS.h3}
              size={TYPOGRAPHY_SIZE.headline24}
              className={cn(styles.h3, styles.title)}
              key={`titleText/${index}`}
            >
              {titleText}
            </Typography>
          )
        ))}

        {!isSubscribed && subtitle && (
          <Typography
            variant={TYPOGRAPHY_TAGS.p}
            className={cn(styles.p, styles.subtitle)}
          >
            {subtitle}
          </Typography>
        )}

        {isSubscribed && (
          <Typography
            variant={TYPOGRAPHY_TAGS.h3}
            size={TYPOGRAPHY_SIZE.headline24}
            className={cn(styles.h3, styles.title)}
          >
            Thanks for your attention!
          </Typography>
        )}

        {isSubscribed && (
          <Typography
            variant={TYPOGRAPHY_TAGS.p}
            className={cn(styles.p, styles.subtitle)}
          >
            Check Inbox to confirm your subscription
          </Typography>
        )}
      </div>

      {!isSubscribeFormShown && (
        <Button
          onClick={handleOnClick || (() => setSubscribeFormShown(true))}
          className={styles.button}
          data-button
        >
          {buttonTitle}
        </Button>
      )}

      {!isSubscribed && isSubscribeFormShown && (
        <SubscribeInCTAForm
          onSubmit={onSubscribeSubmit}
          slug={slug}
        />
      )}
    </>
  );
};
