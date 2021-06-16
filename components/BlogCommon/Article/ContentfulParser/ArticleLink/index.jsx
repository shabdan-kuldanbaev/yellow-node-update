import React from 'react';
import { CallToAction } from 'components/Common/CallToAction';
import { BookmarkCard } from 'components/BlogCommon/Article/BookmarkCard';
import { LINK_TYPES } from 'utils/constants';

export const ArticleLink = ({
  type,
  title,
  buttonTitle,
  slug,
}) => {
  switch (type) {
  case LINK_TYPES.bookmark:
    return title && slug && (
      <BookmarkCard
        title={title}
        slug={slug}
      />
    );
  case LINK_TYPES.callToAction:
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
