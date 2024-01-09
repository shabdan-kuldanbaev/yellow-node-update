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
const BudgetSlider = dynamic(() => import('./BudgetSlider'));

const additionalInfo = [
  'Our experts will analyze your requirements and contact you within 1-2 business days.',
  'Our team will collect all requirements for your project, and if needed, we will sign an NDA to ensure the highest level of privacy.',
  'We will develop a comprehensive proposal and an action plan for your project with estimates, timelines, CVs, etc.',
];

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
    isLoading,
    buttonTitle,
    withoutAdditionalInfo,
    children,
    isValid,
    formContainer,
    formHeader,
  } = useFormProps(props);

  return (
    <div className={cn(styles.formContainer, formContainer)}>
      <form
        className={cn(styles.form, styles[type], className)}
        onSubmit={submitHandler}
      >
        {!!formHeader && formHeader}
        <FormAlert />
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <TextField
            name="name"
            register={register}
            placeholder="Name *"
            errorMessage="Required field"
            required={dirtyFields.name}
          />
        </Animated>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <div className={styles.inputsWrapper}>
            <TextField
              name="phone"
              register={register}
              placeholder="Phone number"
              errorMessage="Incorrect phone number"
              type="tel"
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
          disabled={isLoading || !isValid()}
          className={styles.formButton}
        >
          {buttonTitle || 'Contact Us'}
        </Button>
      </form>

      {!withoutAdditionalInfo && (
        <div className={styles.additionalInfo}>
          {/* eslint-disable-next-line */}
          <h3 className={styles.title}>What's next?</h3>
          <div>
            {additionalInfo.map((text, i) => (
              <div
                className={styles.item}
                key={i}
              >
                <span>{i + 1}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {children}
    </div>
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
