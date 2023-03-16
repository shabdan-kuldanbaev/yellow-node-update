import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import TextField from 'UI/components/TextField';
import Button from 'UI/components/Button';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Upload from './Upload';
import FormAlert from './FormAlert';
import useFormProps from './utils/useFormProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const BudgetSlider = dynamic(() => import('./BudgetSlider'), { ssr: false });

const FeedbackForm = (props) => {
  const {
    className,
    submitHandler,
    register,
    dirtyFields,
    sliderOptions,
    budget,
    isBudgetSlider,
    setFiles,
    selectedFiles,
    type,
    contactFormError,
    isFormPending,
  } = useFormProps(props);

  return (
    <form
      className={cn(styles.form, styles[type], className)}
      onSubmit={submitHandler}
    >
      <FormAlert />
      <Animated {...REVEAL_ANIMATION_PROPS}>
        <div className={styles.inputsWrapper}>
          <TextField
            name="name"
            register={register}
            placeholder="Name *"
            errorMessage="Required field"
            required={dirtyFields.name}
          />

          <TextField
            name="email"
            register={register}
            placeholder="Email *"
            errorMessage="Incorrect email address"
            required={dirtyFields?.email}
            type="email"
          />
        </div>
      </Animated>
      {isBudgetSlider && (
        <BudgetSlider
          budget={budget}
          sliderOptions={sliderOptions}
        />
      )}
      <Animated {...REVEAL_ANIMATION_PROPS}>
        <Upload
          register={register}
          dirtyFields={dirtyFields}
          setFiles={setFiles}
          selectedFiles={selectedFiles}
          formKey={type}
        />
      </Animated>
      {contactFormError && (
        <span className={styles.errorMessage}>
          There was an error trying to send your message. Please try again later
        </span>
      )}
      <Button
        type="submit"
        disabled={isFormPending}
        className={styles.formButton}
      >
        Contact Us
      </Button>
    </form>
  );
};

FeedbackForm.defaultProps = {
  isBudgetSlider: false,
  type: '',
};

FeedbackForm.propTypes = {
  isBudgetSlider: PropTypes.bool,
  type: PropTypes.string,
};

export default FeedbackForm;
