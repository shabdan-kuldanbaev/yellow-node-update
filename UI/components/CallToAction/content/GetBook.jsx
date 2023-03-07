import { useSelector } from 'react-redux';
import cn from 'classnames';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import GetBookModal from 'UI/components/Modals/GetBookModal';
import Button from 'UI/components/Button';
import downloadFile from 'utils/downloadFile';
import useToggle from 'hooks/useToggle';
import { selectIsSubscribed } from 'redux/selectors/subscription';
import styles from '../styles.module.scss';

export default ({
  titles,
  subtitle,
  bookCover,
  buttonTitle,
  downloadLink,
  handleOnClick: handleOnClickProp,
  slug,
}) => {
  const isSubscribed = useSelector(selectIsSubscribed);

  const [isGetBookShown, toggleGetBookModalShown] = useToggle(false);

  const handleOnClick = () => {
    if (isSubscribed) {
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
