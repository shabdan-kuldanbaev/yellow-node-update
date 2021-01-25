import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactGA from 'react-ga';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { CopyLink } from './images';
import styles from './styles.module.scss';

export const SocialThumbnails = ({ url, title }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { asPath } = useRouter();

  const trackSocialShareClick = ({ target }) => {
    ReactGA.event({
      category: 'Click social go to share',
      action: target.getAttribute('data-socialname'),
      label: asPath,
    });
  };

  const handleOnCopy = () => setIsCopied(true);

  return (
    <div className={styles.socialThumbnails}>
      <div className={styles.thumbnailsContainer}>
        <div className={styles.svgContainer} onClick={trackSocialShareClick}>
          <FacebookShareButton
            url={url}
            quote={title}
            className={cn(styles.svg, styles.iconFacebook)}
            data-socialname="Facebook"
          />
        </div>
        <div className={styles.svgContainer} onClick={trackSocialShareClick}>
          <TwitterShareButton
            url={url}
            title={title}
            className={cn(styles.svg, styles.iconTwitter)}
            data-socialname="Twitter"
          />
        </div>
        <CopyToClipboard text={url} onCopy={handleOnCopy}>
          <div className={styles.svgContainer} onClick={trackSocialShareClick}>
            <img
              className={styles.svg}
              src={CopyLink}
              alt="copy link"
              data-socialname="Copy Link"
            />
          </div>
        </CopyToClipboard>
      </div>
      <div className={styles.messageContainer}>
        <span className={cn(styles.shareLinkInfo, { [styles.appear]: isCopied })}>
          THE LINK HAS BEEN COPIED!
        </span>
      </div>
    </div>
  );
};

SocialThumbnails.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
