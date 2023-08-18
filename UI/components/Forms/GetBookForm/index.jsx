import PropTypes from 'prop-types';
import Button from 'UI/components/Button';
import TextField from 'UI/components/TextField';
import useProps from './utils/useProps';
import styles from './GetBookForm.module.scss';

const GetBookForm = (props) => {
  const {
    register,
    isButtonDisabled,
    handleButtonClick,
    dirtyFields,
    buttonText,
    buttonId,
    errorMessage,
  } = useProps(props);

  return (
    <>
      <TextField
        name="name"
        register={register}
        placeholder="Full name *"
        errorMessage="Required field"
        required={dirtyFields?.name}
        classname={styles.input}
      />
      <TextField
        name="email"
        register={register}
        placeholder="Email *"
        errorMessage="Incorrect email address"
        required={dirtyFields?.email}
        type="email"
        classname={styles.input}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      <Button
        className={styles.button}
        disabled={isButtonDisabled}
        onClick={handleButtonClick}
        id={buttonId}
      >
        {buttonText}
      </Button>
    </>
  );
};

GetBookForm.propTypes = {
  downloadLink: PropTypes.string.isRequired,
};

export default GetBookForm;
