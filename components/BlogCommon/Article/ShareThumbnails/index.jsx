import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { useRouter } from 'next/router';
import Svg from 'UI/components/Svg';
import gaHelper from 'utils/ga';
import { SVG_IMAGES_TYPES } from 'utils/constants';
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
        className={styles.svg}
        data-socialname="LinkedIn"
        onClick={trackSocialShareClick}
      >
        <Svg type={SVG_IMAGES_TYPES.linkedinFilledWhite} />
      </LinkedinShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        className={styles.svg}
        data-socialname="Twitter"
        onClick={trackSocialShareClick}
      >
        <Svg type={SVG_IMAGES_TYPES.twitterFilledWhite} />
      </TwitterShareButton>
      <FacebookShareButton
        url={url}
        quote={title}
        className={styles.svg}
        data-socialname="Facebook"
        onClick={trackSocialShareClick}
      >
        <Svg type="facebookFilledWhite" />
      </FacebookShareButton>
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
