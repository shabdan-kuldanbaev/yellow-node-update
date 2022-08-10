import React from 'react';
import PropTypes from 'prop-types';
import CallToAction from 'components/Common/CallToAction';
import BookmarkCard from 'components/BlogCommon/Article/BookmarkCard';

export const ArticleLink = ({
  type,
  title,
  buttonTitle,
  slug,
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
    return title && buttonTitle && slug && (
      <CallToAction
        title={title}
        buttonTitle={buttonTitle}
        href={slug}
        type="blog"
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
};

ArticleLink.propType = {
  type: PropTypes.string,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  slug: PropTypes.string,
};
