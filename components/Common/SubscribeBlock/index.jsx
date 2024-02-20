import PropTypes from 'prop-types';
import cn from 'classnames';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import { withValidateEmail } from 'hocs/withValidateEmail';
import styles from './styles.module.scss';

const SubscribeBlock = ({
  isBlog,
  email,
  handleOnEmailChange,
  handleOnSubmit,
}) => {
  const [_, { data: { isSubscribed, message } = {} }] = useSubscribeMutation({
    fixedCacheKey: SUBSCRIPTION_CASH_KEY,
  });

  const handleOnClick = (event) => {
    event.preventDefault();

    handleOnSubmit(email.value);
  };

  return ((
    <section className={cn(styles.subscribeBlock, {
      [styles.blogPage]: isBlog,
      [styles.articlePage]: !isBlog,
    })}
    >
      {!isSubscribed && (
        <>
          <div className={styles.subscribeText}>
            <h2>Subscribe to new posts.</h2>
            <p>Get weekly updates on the newest design stories, case studies and tips right in your mailbox.</p>
          </div>
          <form
            className={styles.subscribeForm}
            onSubmit={handleOnClick}
          >
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
        </>
      )}

      {isSubscribed && (
        <h2 className={styles.subscribeTitle}>Thank you for being subscribed to the newsletter!</h2>
      )}
    </section>
  ));
};

SubscribeBlock.propTypes = {
  isBlog: PropTypes.bool,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};

export default withValidateEmail(SubscribeBlock);
