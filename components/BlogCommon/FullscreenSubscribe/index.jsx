import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonMore,
  AnimatedInput,
  CheckboxContainer,
  ModalWindow,
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
}) => (
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
            <CheckboxContainer
              text="I accept your"
              isThereLink
              linkText="Privacy Policy"
            />
            <ButtonMore title="Subscribe" buttonStyle={styles.button} handleOnClick={() => handleOnSubmit(email.value)} />
          </div>
        </div>
      </div>
    </div>
  </ModalWindow>
);

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
