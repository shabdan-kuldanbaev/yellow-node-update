import PropTypes from 'prop-types';
import Button from 'UI/components/Button';
import TextField from 'UI/components/TextField';
import styles from './DownloadChecklistForm.module.scss';
import useProps from './utils/useProps';

const DownloadChecklistForm = (props) => {
  const {
    register,
    isButtonDisabled,
    handleButtonClick,
    dirtyFields,
    message,
  } = useProps(props);

  return (
    <>
      <TextField
        name="name"
        register={register}
        placeholder="Name *"
        errorMessage="Required field"
        required={dirtyFields?.name}
        classname={styles.input}
      />
      <TextField
        name="lastName"
        register={register}
        placeholder="Last Name *"
        errorMessage="Required field"
        required={dirtyFields?.lastName}
        classname={styles.input}
      />
      <TextField
        name="email"
        register={register}
        placeholder="Email *"
        errorMessage="Incorrect email address"
        required={dirtyFields?.email}
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
};

export default DownloadChecklistForm;
