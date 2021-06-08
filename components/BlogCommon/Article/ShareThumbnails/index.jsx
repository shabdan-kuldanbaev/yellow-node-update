import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import cn from 'classnames';
import { useRouter } from 'next/router';
import gaHelper from 'utils/ga';
import styles from './styles.module.scss';

export const ShareThumbnails = ({ url, title }) => {
  const { asPath } = useRouter();

  const trackSocialShareClick = ({ target }) => {
    gaHelper.trackEvent(
      'Click social go to share',
      target.getAttribute('data-socialname'),
      asPath,
    );
  };

  return (
    <div className={styles.socialThumbnails}>
      <LinkedinShareButton
        url={url}
        title={title}
        className={cn(styles.svg, styles.iconLinkedin)}
        data-socialname="LinkedIn"
        onClick={trackSocialShareClick}
      />
      <TwitterShareButton
        url={url}
        title={title}
        className={cn(styles.svg, styles.iconTwitter)}
        data-socialname="Twitter"
        onClick={trackSocialShareClick}
      />
      <FacebookShareButton
        url={url}
        quote={title}
        className={cn(styles.svg, styles.iconFacebook)}
        data-socialname="Facebook"
        onClick={trackSocialShareClick}
      />
    </div>
  );
};

ShareThumbnails.defaultProps = {
  title: '',
};

ShareThumbnails.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};
