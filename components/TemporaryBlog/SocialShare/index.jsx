import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import styles from './styles.module.scss';

class SocialShare extends PureComponent {
  trackSocialShareClick = ({ target: { getAttribute } }) => {
    const social = getAttribute('data-socialname');
  }

  render() {
    const { url, title, description } = this.props;
    return (
      <div className={styles.iconContainer}>
        <div onClick={this.trackSocialShareClick}>
          <FacebookShareButton
            url={url}
            quote={title}
            className={`${styles.icon} ${styles.iconFacebook}`}
            additionalProps={{ 'data-socialname': 'Facebook' }}
          />
        </div>
        <div onClick={this.trackSocialShareClick}>
          <LinkedinShareButton
            url={url}
            title={title}
            description={description}
            className={`${styles.icon} ${styles.iconLinkedin}`}
            additionalProps={{ 'data-socialname': 'LinkedIn' }}
          />
        </div>
        <div onClick={this.trackSocialShareClick}>
          <TwitterShareButton
            url={url}
            title={title}
            className={`${styles.icon} ${styles.iconTwitter}`}
            additionalProps={{ 'data-socialname': 'Twitter' }}
          />
        </div>
      </div>
    );
  }
}

SocialShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default SocialShare;
