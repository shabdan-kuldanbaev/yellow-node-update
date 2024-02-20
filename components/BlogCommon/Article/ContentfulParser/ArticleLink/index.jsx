import PropTypes from 'prop-types';
import CallToAction from 'components/Common/CallToAction';
import { CustomYoutubePlayer } from 'components/Common/CustomYoutubePlayer';
import CallToActionNew from 'UI/components/CallToAction';
import BookmarkContainer from 'UI/containers/BookmarkContainer';
import { getYoutubeVideoIdFromUrl } from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';
import styles from './ArticleLink.module.scss';

export const ArticleLink = ({
  data,
  new: isNew,
  type = '',
  title = '',
  buttonTitle = '',
  slug = '',
  url = '',
  className = '',
}) => {
  switch (type) {
  case LINK_TYPE.bookmark:
    return title && (url || slug) && (
      <BookmarkContainer
        title={title}
        url={url || slug}
        buttonTitle={buttonTitle}
      />
    );

  case LINK_TYPE.youTube:
    return url && (
      <CustomYoutubePlayer
        src={getYoutubeVideoIdFromUrl(url)}
        className={className}
      />
    );

  default:
    if (isNew) {
      return (
        <CallToActionNew
          data={data}
          className={styles.cta}
        />
      );
    }

    return (
      <CallToAction
        title={title}
        buttonTitle={buttonTitle}
        href={slug}
        type="blog"
      />
    );
  }
};

ArticleLink.propType = {
  type: PropTypes.string,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  slug: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
};
