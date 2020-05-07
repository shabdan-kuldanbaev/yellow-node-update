import React from 'react';
import cn from 'classnames';
import {
  ButtonMore,
  AnimatedInput,
  // TODO PrivacyPolicyCheckbox,
} from 'components';
import Link from 'next/link';
import { useOverflowForBody } from 'hooks';
import { withValidateEmail } from 'hocs';
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
            <span className={styles.title}>
              Join for weekly insights
            </span>
            <span className={styles.subtitle}>
              We’ll send how-to articles, case studies, and Yalantis updates to your inbox every Thursday!
            </span>
            <div className={styles.inputBlock}>
              <AnimatedInput
                value={email.value}
                handleOnChange={handleOnEmailChange}
                placeholder="Enter your email address"
                withoutLabel
                type="email"
                isValidate={email.isValidate}
                handleOnBlurEmail={handleOnBlurEmail}
              />

              {/* TODO */}
              <label className={styles.checkbox}>
                <span>I accept your</span>
                <Link href="/privacy-policy">
                  <span className={styles.link}>Privacy Policy</span>
                </Link>
                <input type="checkbox" />
                <span className={styles.checkmark} />
              </label>
              {/* TODO */}

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

export default withValidateEmail(FullscreenSubscribe);
