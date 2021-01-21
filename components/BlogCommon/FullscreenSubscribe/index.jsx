import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonMore,
  AnimatedInput,
  ModalWindow,
  InformationMessage,
} from 'components';
import { withValidateEmail } from 'hocs';
import styles from './styles.module.scss';

const FullscreenSubscribe = ({
  isFullscreenSubscribe,
  closeFullscreenSubscribe,
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  handleOnSubmit,
}) => {
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);

  const handleOnIsPolicyAcceptedChange = ({ target: { checked } }) => setIsPolicyAccepted(checked);
  const handleOnClick = () => handleOnSubmit(email.value);

  return (
    <ModalWindow
      isModalWindow={isFullscreenSubscribe}
      closeModalWindow={closeFullscreenSubscribe}
      className={styles.fullscreenSubscribe}
    >
      <div className={styles.subscribeBlock}>
        <div className={styles.subscribe}>
          <div className={styles.content}>
            <span className={styles.title}>Join for weekly insights</span>
            <span className={styles.subtitle}>We’ll send how-to articles, case studies, and Yalantis updates to your inbox every Thursday!</span>
            <div className={styles.inputBlock}>
              <AnimatedInput
                value={email.value}
                handleOnChange={handleOnEmailChange}
                placeholder="Enter your email address"
                isWithoutLabel
                type="email"
                isValidate={email.isValidate}
                handleOnBlurEmail={handleOnBlurEmail}
              />
              {/* TODO return this later
              <CheckboxContainer
                text="I accept your"
                isThereLink
                linkText="Privacy Policy"
                handleOnChange={handleOnIsPolicyAcceptedChange}
              />
              <InformationMessage isAppear={!isPolicyAccepted} /> */}
              <ButtonMore
                title="Subscribe"
                buttonStyle={styles.button}
                handleOnClick={handleOnClick}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

FullscreenSubscribe.defaultProps = {
  isFullscreenSubscribe: false,
};

FullscreenSubscribe.propTypes = {
  isFullscreenSubscribe: PropTypes.bool,
  closeFullscreenSubscribe: PropTypes.func.isRequired,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};

export default withValidateEmail(FullscreenSubscribe);
