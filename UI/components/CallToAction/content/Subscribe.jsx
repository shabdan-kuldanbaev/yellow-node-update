import { useState } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import usePageClusters from 'hooks/usePageClusters';
import styles from '../styles.module.scss';

const Typography = dynamic(() => import('UI/components/Typography'));
const Button = dynamic(() => import('UI/components/Button'));
const SubscribeInCTAForm = dynamic(() => import('UI/components/Forms/SubscribeInCTAForm'));

export default ({
  titles,
  subtitle,
  buttonTitle,
  handleOnClick,
  slug,
}) => {
  const [
    subscribe,
    { data: { subscriptionEmail } = {} },
  ] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const [isSubscribeFormShown, setSubscribeFormShown] = useState(false);
  const [isSubsribedInBlock, setSubsribedInBlock] = useState(false);

  const pageClusters = usePageClusters();

  const subscribeButtonClick = () => {
    if (handleOnClick) {
      return handleOnClick();
    }

    if (!subscriptionEmail) {
      return setSubscribeFormShown(true);
    }

    Promise.resolve(subscribe({ email: subscriptionEmail, pageClusters }));
    setSubsribedInBlock(true);
  };

  return (
    <>
      <div className={cn(
        styles.content,
        { [styles.isSubscribed]: isSubsribedInBlock },
      )}
      >
        {!isSubsribedInBlock && titles?.map((titleText, index) => (
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

        {!isSubsribedInBlock && subtitle && (
          <Typography
            variant={TYPOGRAPHY_TAGS.p}
            className={cn(styles.p, styles.subtitle)}
          >
            {subtitle}
          </Typography>
        )}

        {isSubsribedInBlock && (
          <Typography
            variant={TYPOGRAPHY_TAGS.h3}
            size={TYPOGRAPHY_SIZE.headline24}
            className={cn(styles.h3, styles.title)}
          >
            Thanks for your attention!
          </Typography>
        )}

        {isSubsribedInBlock && (
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
          onClick={subscribeButtonClick}
          className={styles.button}
          data-button
        >
          {buttonTitle}
        </Button>
      )}

      {!isSubsribedInBlock && isSubscribeFormShown && (
        <SubscribeInCTAForm
          slug={slug}
          onSubscriptionFinished={() => setSubsribedInBlock(true)}
        />
      )}
    </>
  );
};
