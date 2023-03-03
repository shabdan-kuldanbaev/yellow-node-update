import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { messageCleared } from 'redux/reducers/subscription';
import { selectSubscribeMessage, selectIsSubscribed } from 'redux/selectors/subscription';
import { withValidateEmail } from 'hocs/withValidateEmail';
import styles from './styles.module.scss';

const SubscribeBlock = ({
  isBlog,
  email,
  handleOnEmailChange,
  handleOnSubmit,
}) => {
  const dispatch = useDispatch();
  const message = useSelector(selectSubscribeMessage);
  const isSubscribed = useSelector(selectIsSubscribed);

  const handleOnClick = (event) => {
    event.preventDefault();

    handleOnSubmit(email.value);
  };

  useEffect(
    () => () => dispatch(messageCleared()),
    [dispatch],
  );

  return (!isSubscribed && (
    <section className={cn(styles.subscribeBlock, {
      [styles.blogPage]: isBlog,
      [styles.articlePage]: !isBlog,
    })}
    >
      <div className={styles.subscribeText}>
        <h2>Subscribe to new posts.</h2>
        <p>Get weekly updates on the newest design stories, case studies and tips right in your mailbox.</p>
      </div>
      <form className={styles.subscribeForm}>
        <input
          value={email.value}
          onChange={handleOnEmailChange}
          placeholder="Your email address"
        />
        {message && (
          <span className={styles.alertMessage}>
            {message}
          </span>
        )}
        <div
          className={styles.button}
          onClick={handleOnClick}
          role="button"
          tabIndex="0"
        >
          Subscribe
        </div>
      </form>
    </section>
  ));
};

SubscribeBlock.defaultProps = {
  isBlog: false,
};

SubscribeBlock.propTypes = {
  isBlog: PropTypes.bool,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};

export default withValidateEmail(SubscribeBlock);
