import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Background from './images/background.jpg';
import styles from './styles.module.scss';

export const SubscribeBlock = ({ isBlog }) => (
  <section className={cn(styles.subscribeBlock, {
    [styles.blogPage]: isBlog,
    [styles.articlePage]: !isBlog,
  })}
  >
    <div className={styles.subscribeWrapper}>
      <div className={styles.subscribeHeader}>
        <h3>Subscribe to new posts.</h3>
        <form className={styles.subscribeForm}>
          <input placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className={styles.subscribeMessage} style={{ backgroundImage: `url(${Background})` }}>
        <h3>Get weekly updates on the newest design stories, case studies and tips right in your mailbox.</h3>
      </div>
    </div>
  </section>
);

SubscribeBlock.defaultProps = {
  isBlog: false,
};

SubscribeBlock.propTypes = {
  isBlog: PropTypes.bool,
};
