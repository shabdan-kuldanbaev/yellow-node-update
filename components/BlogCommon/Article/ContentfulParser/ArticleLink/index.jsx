import React from 'react';
import PropTypes from 'prop-types';
import CallToAction from 'components/Common/CallToAction';
import CallToActionNew from 'UI/components/CallToAction';
import BookmarkCard from 'components/BlogCommon/Article/BookmarkCard';
import { CustomYoutubePlayer } from 'components/Common/CustomYoutubePlayer';
import { getYoutubeVideoIdFromUrl } from 'utils/helper';
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
  case 'bookmark':
    return title && slug && (
      <BookmarkCard
        title={title}
        slug={slug}
      />
    );
  case 'call-to-action':
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
  case 'youtube-video':
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
