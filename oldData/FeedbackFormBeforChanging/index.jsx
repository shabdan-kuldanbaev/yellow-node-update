import React, { useState } from 'react';
import {
  SectionTitle,
  Upload,
  AnimatedInput,
  ButtonMore,
  CheckboxContainer,
} from 'components';
import { withValidateEmail } from 'hocs';
import styles from './styles.module.scss';

const FeedbackForm = ({
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
}) => {
  const [fullName, setFullName] = useState('');
  const handleOnNameChange = ({ target: { value } }) => setFullName(value);

  return (
    <div className={styles.formContainer}>
      <SectionTitle
        title="Let’s move forward"
        styleTitle={styles.title}
        styleSubtitle={styles.subtitle}
        isFeedbackForm
        subtitle="true"
      />
      <form className={styles.form}>
        <div className={styles.inputs}>
          <AnimatedInput
            value={fullName}
            handleOnChange={handleOnNameChange}
            placeholder="Name"
            isValidate
          />
          <AnimatedInput
            value={email.value}
            handleOnChange={handleOnEmailChange}
            placeholder="Email"
            type="email"
            isValidate={email.isValidate}
            handleOnBlurEmail={handleOnBlurEmail}
          />
        </div>
        <Upload />
        <div className={styles.checkboxContainer}>
          <CheckboxContainer
            text="I accept your"
            isThereLink
            linkText="Privacy Policy"
          />
          <CheckboxContainer text="Send me NDA" isThereLink={false} />
        </div>
        <ButtonMore
          href="/"
          title="SEND"
          buttonStyle={styles.submit}
        />
      </form>
    </div>
  );
};

export default withValidateEmail(FeedbackForm);
