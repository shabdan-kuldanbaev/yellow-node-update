import cn from 'classnames';
import dynamic from 'next/dynamic';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import Button from 'UI/components/Button';
import downloadFile from 'utils/downloadFile';
import useToggle from 'hooks/useToggle';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import usePageClusters from 'hooks/usePageClusters';
import styles from '../styles.module.scss';

const Typography = dynamic(() => import('UI/components/Typography'));
const GetBookModal = dynamic(() => import('UI/components/Modals/GetBookModal'), { ssr: false });

export default ({
  titles,
  subtitle,
  bookCover,
  buttonTitle,
  downloadLink,
  handleOnClick: handleOnClickProp,
  slug,
}) => {
  const [
    subscribe,
    { data: { subscriptionEmail } = {} },
  ] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const [isGetBookShown, toggleGetBookModalShown] = useToggle(false);

  const pageClusters = usePageClusters();

  const handleOnClick = () => {
    if (subscriptionEmail) {
      Promise.resolve(subscribe({ email: subscriptionEmail, pageClusters }));

      return downloadFile(downloadLink);
    }

    toggleGetBookModalShown(true);
  };

  return (
    <>
      <div className={styles.content}>
        {titles?.map((titleText, index) => (
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

        {subtitle && (
          <Typography
            variant={TYPOGRAPHY_TAGS.p}
            className={cn(styles.p, styles.subtitle)}
          >
            {subtitle}
          </Typography>
        )}
      </div>

      <Button
        onClick={handleOnClickProp || handleOnClick}
        className={styles.button}
        data-button
        id={`${slug}/get-book`}
      >
        {buttonTitle}
      </Button>

      <GetBookModal
        show={isGetBookShown}
        close={toggleGetBookModalShown}
        bookCover={bookCover}
        buttonText={buttonTitle}
        downloadLink={downloadLink}
      />
    </>
  );
};
