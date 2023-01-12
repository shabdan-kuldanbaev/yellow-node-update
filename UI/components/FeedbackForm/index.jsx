import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'UI/components/TextField';
import Animated from 'UI/containers/Animated';
import Button from 'UI/components/Button';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { selectError } from 'redux/selectors/contact';
import { sendEmail } from 'redux/actions/contact';
import BudgetSlider from './BudgetSlider';
import Upload from './Upload';
import useFormProps from './utils/useFormProps';
import styles from './styles.module.scss';

const FeedbackForm = (props) => {
  const {
    submitHandler,
    register,
    dirtyFields,
    sliderOptions,
    budget,
    isBudgetSlider,
    setFiles,
    selectedFiles,
    isValid,
    isDirty,
    type,
    contactFormError,
  } = useFormProps(props);

  return (
    <form
      className={cn(styles.form, styles[type])}
      onSubmit={submitHandler}
    >
      <Animated {...REVEAL_ANIMATION_PROPS}>
        <div className={styles.inputsWrapper}>
          <TextField
            name="name"
            register={register}
            placeholder="Name *"
            errorMessage="Invalid email"
            required={dirtyFields?.name}
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
        disabled={!isDirty || !isValid}
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
  email: PropTypes.instanceOf(Object).isRequired,
  isBudgetSlider: PropTypes.bool,
  sendEmail: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default connect(
  (state) => ({ contactFormError: selectError(state) }),
  { sendEmail },
)(FeedbackForm);
