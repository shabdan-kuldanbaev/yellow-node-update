import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { clearMessage } from 'redux/actions/subscribe';
import { selectSubscribeMessage, selectIsSubscribed } from 'redux/selectors/subscribe';
import { withValidateEmail } from 'hocs';
import { staticImagesUrls } from 'utils/helper';
import styles from './styles.module.scss';

const SubscribeBlock = ({
  isBlog,
  email,
  handleOnEmailChange,
  handleOnSubmit,
  message,
  clearMessage: clearAlertMessage,
  isSubscribed,
}) => {
  const handleOnClick = (event) => {
    event.preventDefault();

    handleOnSubmit(email.value);
  };

  useEffect(() => () => clearAlertMessage(), []);

  return (!isSubscribed && (
    <section className={cn(styles.subscribeBlock, {
      [styles.blogPage]: isBlog,
      [styles.articlePage]: !isBlog,
    })}
    >
      <div className={styles.subscribeWrapper}>
        <div className={styles.subscribeHeader}>
          <h3>Subscribe to new posts.</h3>
          <form className={styles.subscribeForm}>
            <input
              value={email.value}
              onChange={handleOnEmailChange}
              placeholder="Your email address"
            />
            <div
              className={styles.button}
              onClick={handleOnClick}
              role="button"
              tabIndex="0"
            >
              Subscribe
            </div>
            {message && <span className={styles.alertMessage}>{message}</span>}
          </form>
        </div>
        <div className={styles.subscribeMessage} style={{ backgroundImage: `url(${staticImagesUrls.subscribeBlockBackground})` }}>
          <h3>Get weekly updates on the newest design stories, case studies and tips right in your mailbox.</h3>
        </div>
      </div>
    </section>
  ));
};

SubscribeBlock.defaultProps = {
  isBlog: false,
  isSubscribed: false,
};

SubscribeBlock.propTypes = {
  isBlog: PropTypes.bool,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired,
  isSubscribed: PropTypes.bool,
};

export default connect(
  (state) => ({
    message: selectSubscribeMessage(state),
    isSubscribed: selectIsSubscribed(state),
  }),
  { clearMessage },
)(withValidateEmail(SubscribeBlock));
