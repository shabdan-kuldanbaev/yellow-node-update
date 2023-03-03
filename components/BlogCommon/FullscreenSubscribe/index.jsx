import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubscribeMessage } from 'redux/selectors/subscribe';
import AnimatedInput from 'components/Common/AnimatedInput';
import ButtonMore from 'components/Common/ButtonMore';
import ModalWindow from 'components/Common/ModalWindow';
import { withValidateEmail } from 'hocs/withValidateEmail';
import { messageCleared } from 'redux/reducers/subscribe';
import styles from './styles.module.scss';

const FullscreenSubscribe = ({
  isFullscreenSubscribe,
  closeFullscreenSubscribe,
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  handleOnSubmit,
}) => {
  const message = useSelector(selectSubscribeMessage);

  const dispatch = useDispatch();

  const handleOnClick = (event) => {
    event.preventDefault();

    handleOnSubmit(email.value);
  };

  useEffect(
    () => () => dispatch(messageCleared()),
    [dispatch],
  );

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
  handleOnSubmit: () => {},
};

FullscreenSubscribe.propTypes = {
  isFullscreenSubscribe: PropTypes.bool,
  closeFullscreenSubscribe: PropTypes.func.isRequired,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func,
  message: PropTypes.string.isRequired,
};

export default withValidateEmail(FullscreenSubscribe);
