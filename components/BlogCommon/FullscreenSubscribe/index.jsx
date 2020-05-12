import React from 'react';
import cn from 'classnames';
import {
  ButtonMore,
  AnimatedInput,
  CheckboxContainer,
} from 'components';
import { useOverflowForBody } from 'hooks';
import { withValidateEmail } from 'hocs';
import PropTypes from 'prop-types';
import CloseIcon from './images/close.svg';
import styles from './styles.module.scss';

const FullscreenSubscribe = ({
  isFullscreenSubscribe,
  closeFullscreenSubscribe,
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
}) => {
  useOverflowForBody(isFullscreenSubscribe);

  return (
    <section className={cn(styles.fullscreenSubscribe, { [styles.show]: isFullscreenSubscribe })}>
      <img
        onClick={closeFullscreenSubscribe}
        src={CloseIcon}
        alt="Cloce"
      />
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
              <ButtonMore
                handleOnClick=""
                title="Subscribe"
                buttonStyle={styles.button}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
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
};

export default withValidateEmail(FullscreenSubscribe);
