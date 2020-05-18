import React, { useState } from 'react';
import { ButtonMore, AnimatedInput } from 'components';
import { withValidateEmail } from 'hocs';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Subscribe = ({
  isMobile,
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
}) => {
  const placeholderText = 'Email';
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholderText);

  const handleOnFocus = () => setCurrentPlaceholder('');
  const handleOnBlur = () => setCurrentPlaceholder(placeholderText);

  return (
    <section className={styles.subscribeBlock}>
      <div className={styles.subscribe}>
        <div className={styles.content}>
          <span className={styles.title}>Don't want to miss anything?</span>
          <span className={styles.subtitle}>Get weekly updates on the newest design stories, case studies and tips right in your mailbox.</span>
          <div className={styles.inputBlock}>
            {!isMobile
              ? (
                <input
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  className={styles.input}
                  type="email"
                  placeholder={currentPlaceholder}
                  value={email.value}
                  onChange={handleOnEmailChange}
                  handleOnBlurEmail={handleOnBlurEmail}
                />
              )
              : (
                <AnimatedInput
                  value={email.value}
                  handleOnChange={handleOnEmailChange}
                  placeholder={placeholderText}
                  type="email"
                  isValidate={email.isValidate}
                  handleOnBlurEmail={handleOnBlurEmail}
                />
              )}
            <ButtonMore
              handleOnClick=""
              href="/blog"
              title="Submit"
              buttonStyle={styles.button}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Subscribe.defaultProps = {
  isMobile: false,
};

Subscribe.propTypes = {
  isMobile: PropTypes.bool,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
};

export default withValidateEmail(Subscribe);
