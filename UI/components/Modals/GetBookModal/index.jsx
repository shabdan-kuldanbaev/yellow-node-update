import Modal from 'UI/containers/Modal';
import Illustration from 'UI/components/Illustration';
import GetBookForm from 'UI/components/Forms/GetBookForm';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import Button from 'UI/components/Button';
import useProps from './utils/useProps';
import styles from './GetBookModal.module.scss';

const GetBookModal = (props) => {
  const {
    show,
    close,
    bookCover,
    buttonText,
    isSubscribed,
  } = useProps(props);

  return (
    <Modal
      show={show}
      close={close}
      className={styles.modal}
    >
      <div className={styles.container}>
        <Illustration
          src={bookCover?.url}
          alt={bookCover?.alt}
          className={styles.image}
        />
        {!isSubscribed && (
          <GetBookForm
            isOpen={show}
            buttonText={buttonText}
          />
        )}
        {isSubscribed && (
          <>
            <Typography
              size={TYPOGRAPHY_SIZE.headline24}
              isBold
            >
              Thank you!
            </Typography>
            <Button
              className={styles.backButton}
              onClick={close}
            >
              Go back
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default GetBookModal;
