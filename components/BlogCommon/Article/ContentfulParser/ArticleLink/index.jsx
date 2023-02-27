import React from 'react';
import PropTypes from 'prop-types';
import CallToAction from 'components/Common/CallToAction';
import CallToActionNew from 'UI/components/CallToAction';
import { CustomYoutubePlayer } from 'components/Common/CustomYoutubePlayer';
import { getYoutubeVideoIdFromUrl } from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';
import BookmarkContainer from 'UI/containers/BookmarkContainer';
import styles from './ArticleLink.module.scss';

export const ArticleLink = ({
  data,
  new: isNew,
  type,
  title,
  buttonTitle,
  slug,
  url,
  className,
}) => {
  switch (type) {
  case LINK_TYPE.bookmark:
    return title && slug && (
      <BookmarkContainer
        title={title}
        url={slug}
        buttonTitle={buttonTitle}
      />
    );
  case LINK_TYPE.callToAction:
  case LINK_TYPE.book:
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
  case LINK_TYPE.youTube:
    return url && (
      <CustomYoutubePlayer
        src={getYoutubeVideoIdFromUrl(url)}
        className={className}
      />
    );
  default:
    return null;
  }
};

ArticleLink.defaultProps = {
  type: '',
  title: '',
  buttonTitle: '',
  slug: '',
  url: '',
  className: '',
};

ArticleLink.propType = {
  type: PropTypes.string,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  slug: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
};
