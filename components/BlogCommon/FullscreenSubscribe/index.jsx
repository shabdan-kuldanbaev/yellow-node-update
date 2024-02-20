import PropTypes from 'prop-types';
import AnimatedInput from 'components/Common/AnimatedInput';
import ButtonMore from 'components/Common/ButtonMore';
import ModalWindow from 'components/Common/ModalWindow';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import { withValidateEmail } from 'hocs/withValidateEmail';
import styles from './styles.module.scss';

const FullscreenSubscribe = ({
  closeFullscreenSubscribe,
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  handleOnSubmit = () => {},
  isFullscreenSubscribe = false,
}) => {
  const [_, { data: { message } = {} }] = useSubscribeMutation({
    fixedCacheKey: SUBSCRIPTION_CASH_KEY,
  });

  const handleOnClick = (event) => {
    event.preventDefault();

    handleOnSubmit(email.value);
  };

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
                placeholder="Email*"
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

FullscreenSubscribe.propTypes = {
  isFullscreenSubscribe: PropTypes.bool,
  closeFullscreenSubscribe: PropTypes.func.isRequired,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func,
};

export default withValidateEmail(FullscreenSubscribe);
