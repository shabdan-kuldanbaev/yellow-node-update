/* eslint-disable react/jsx-max-props-per-line */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from 'utils/constants';
import { rootUrl, getPathWithCdn } from 'utils/helper';
import { isArticle } from 'utils/blogUtils';
import { ogMetaData } from './utils/data';

export const MetaTags = ({
  page,
  ogMetaData: ogData,
  pageMetadata: {
    metaTitle,
    metaDescription,
    image,
    publishedAt,
    categoryTag,
    keyWords,
    slug,
    pageNumber,
  },
  children,
  microdata,
}) => {
  const { asPath } = useRouter();
  const isArticlePage = isArticle(slug);
  const isBlogCategory = (page === ROUTES.blog.slug && !isArticlePage);

  const getTitle = (title) => {
    if (isArticlePage) {
      return metaTitle;
    }

    return (pageNumber && pageNumber !== 1)
      ? `Page ${pageNumber}. ${title}`
      : title;
  };
  const getDescription = (description) => (isArticlePage ? metaDescription : description);
  const getImage = (img) => (isArticlePage ? image : img);
  const getUrl = (url) => ((isArticlePage || isBlogCategory) ? `${rootUrl}${asPath}` : url);
  const date = isArticlePage ? publishedAt : new Date();
  const type = isArticlePage ? 'article' : 'website';

  return (
    <Head>
      {page && ogData && ogData.filter(({ pageName }) => pageName === page)
        .map(({
          title,
          description,
          url,
        }) => (
          <Fragment key={`meta/${title}`}>
            <title>{getTitle(title)}</title>
            <meta name="description" content={getDescription(description)} />
            <meta name="date" content={date} />
            <link rel="canonical" href={getUrl(url)} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={type} />
            <meta property="og:description" content={getDescription(description)} />
            <meta property="og:title" content={getTitle(title)} />
            <meta property="og:url" content={getUrl(url)} />
            <meta property="og:image" content={getImage(getPathWithCdn('/apple-touch-icon.png'))} />
            {categoryTag && <meta property="article:section" content={categoryTag} />}
            {publishedAt && <meta property="article:published_time" content={publishedAt} />}
            {keyWords && keyWords.map((keyWord) => (
              <meta property="article:tag" content={keyWord} />
            ))}
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <meta name="google-site-verification" content="Ou5rI476W6QK1BYTyVkJaDjTwbCFy7jdbEO5etMIi0k" />
            <link rel="shortcut icon" href={getPathWithCdn('/yellow_logo.ico')} />
            <link rel="apple-touch-icon" sizes="180x180" href={getPathWithCdn('/apple-touch-icon.png')} />
            <link rel="mask-icon" href={getPathWithCdn('/safari-pinned-tab.svg')} color="#ffbf02" />
            <link rel="manifest" href="/manifest.json" />
            {!isEmpty(microdata) && (
              <script
                key={`JSON-LD-${microdata.name}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata) }}
              />
            )}
          </Fragment>
        ))}
      {children}
    </Head>
  );
};

MetaTags.defaultProps = {
  page: '',
  ogMetaData,
  microdata: {},
  children: null,
  pageMetadata: {},
};

MetaTags.propTypes = {
  page: PropTypes.string,
  ogMetaData: PropTypes.instanceOf(Array),
  microdata: PropTypes.instanceOf(Object),
  pageMetadata: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    image: PropTypes.string,
    publishedAt: PropTypes.string,
    categoryTag: PropTypes.string,
    keyWords: PropTypes.string,
    slug: PropTypes.string,
    pageNumber: PropTypes.number,
  }),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
};
