import PropTypes from 'prop-types';
import Button from 'UI/components/Button';
import TextField from 'UI/components/TextField';
import useProps from './utils/useProps';
import styles from './DownloadChecklistForm.module.scss';

const DownloadChecklistForm = (props) => {
  const {
    register,
    isButtonDisabled,
    handleButtonClick,
    touchedFields,
    message,
  } = useProps(props);

  return (
    <>
      <TextField
        name="name"
        register={register}
        placeholder="Name *"
        errorMessage="Required field"
        required={touchedFields?.name}
        className={styles.input}
      />
      <TextField
        name="lastName"
        register={register}
        placeholder="Last Name *"
        errorMessage="Required field"
        required={touchedFields?.lastName}
        className={styles.input}
      />
      <TextField
        name="email"
        register={register}
        placeholder="Email *"
        errorMessage="Incorrect email address"
        required={touchedFields?.email}
        type="email"
        className={styles.input}
      />
      {message && <p className={styles.message}>{message}</p>}
      <Button
        className={styles.button}
        disabled={isButtonDisabled}
        onClick={handleButtonClick}
      >
        Download
      </Button>
    </>
  );
};

DownloadChecklistForm.propTypes = {
  downloadLink: PropTypes.string.isRequired,
  pageSlug: PropTypes.string,
};

export default DownloadChecklistForm;
