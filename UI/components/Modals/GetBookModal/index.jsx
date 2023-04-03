import dynamic from 'next/dynamic';
import Modal from 'UI/containers/Modal';
import Illustration from 'UI/components/Illustration';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import useProps from './utils/useProps';
import styles from './GetBookModal.module.scss';

const GetBookForm = dynamic(() => import('UI/components/Forms/GetBookForm'));
const Typography = dynamic(() => import('UI/components/Typography'));
const Button = dynamic(() => import('UI/components/Button'));

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
