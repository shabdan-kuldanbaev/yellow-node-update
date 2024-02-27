import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { usePathname } from 'next/navigation';
import gaHelper from 'utils/ga';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

export const ShareThumbnails = ({
  url,
  title = '',
}) => {
  const pathname = usePathname();

  const trackSocialShareClick = ({ target }) => {
    gaHelper.trackEvent(
      'Click social go to share',
      target.getAttribute('data-socialname'),
      pathname,
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

ShareThumbnails.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};
