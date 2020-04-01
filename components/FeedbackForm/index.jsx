import React, { useState } from 'react';
import {
  SectionTitle,
  Upload,
  AnimatedInput,
  ButtonMore,
} from 'components';
import styles from './styles.module.scss';
import { CheckboxContainer } from './CheckboxContainer';

const FeedbackForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleOnNameChange = ({ target: { value } }) => {
    setFullName(value);
  };

  const handleOnEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  return (
    <div className={styles.formContainer}>
      <SectionTitle
        title="Let’s move forward"
        styleTitle={styles.title}
        subtitle
        styleSubtitle={styles.subtitle}
        isFeedbackForm
      />
      <form className={styles.form}>
        <div className={styles.inputs}>
          <AnimatedInput
            value={fullName}
            handleOnChange={handleOnNameChange}
            placeholder="Name"
          />
          <AnimatedInput
            value={email}
            handleOnChange={handleOnEmailChange}
            placeholder="Email"
          />
        </div>
        <Upload />
        <CheckboxContainer />
        <ButtonMore
          href="/"
          title="Send"
          buttonStyle={styles.submit}
        />
      </form>
    </div>
  );
};

export default FeedbackForm;
