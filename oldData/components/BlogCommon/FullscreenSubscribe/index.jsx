import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearMessage } from 'redux/actions/subscribe';
import { selectSubscribeMessage } from 'redux/selectors/subscribe';
import {
  ButtonMore,
  AnimatedInput,
  ModalWindow,
  // TODO InformationMessage,
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
  message,
  clearMessage,
}) => {
  // TODO const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  // const handleOnIsPolicyAcceptedChange = ({ target: { checked } }) => setIsPolicyAccepted(checked);

  const handleOnClick = (event) => {
    event.preventDefault();

    handleOnSubmit(email.value);
  };

  useEffect(() => () => clearMessage(), []);

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
            <span className={styles.subtitle}>Get weekly updates on the newest design stories, case studies and tips right in your mailbox.</span>
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
              {message && <span className={styles.alertMessage}>{message}</span>}
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
  message: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ message: selectSubscribeMessage(state) }),
  { clearMessage },
)(withValidateEmail(FullscreenSubscribe));
