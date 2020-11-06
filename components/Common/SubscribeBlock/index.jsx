import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components';
import { withValidateEmail } from 'hocs';
import Background from './images/background.jpg';
import styles from './styles.module.scss';

const SubscribeBlock = ({
  isBlog,
  email,
  handleOnEmailChange,
  handleOnSubmit,
}) => {
  const handleOnClick = () => handleOnSubmit(email.value);

  return (
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
            <LinkWrapper path="/" isLocalLink>
              <div className={styles.button} onClick={handleOnClick}>
                Subscribe
              </div>
            </LinkWrapper>
          </form>
        </div>
        <div className={styles.subscribeMessage} style={{ backgroundImage: `url(${Background})` }}>
          <h3>Get weekly updates on the newest design stories, case studies and tips right in your mailbox.</h3>
        </div>
      </div>
    </section>
  );
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
