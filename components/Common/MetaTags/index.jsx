/* eslint-disable react/jsx-max-props-per-line */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';
import isEmpty from 'lodash/isEmpty';
import { getPathWithCdn } from 'utils/helper';
import { microdata } from 'utils/microdata';
import { IS_PROD } from 'utils/constants';
import { ogMetaData } from './utils/data';

const MetaTags = ({
  page,
  pageMetadata,
  children,
  pageMicrodata,
  breadcrumbs,
  isArticle,
  defaultMetaData,
}) => {
  const {
    metaTitle,
    metaDescription,
    metaRobots,
    image,
    publishedAt,
    categoryTag,
    keyWords,
    pageNumber,
    url,
    ogImage,
  } = pageMetadata;
  const {
    metaTitle: defaultMetaTitle,
    metaDescription: defaultMetaDescription,
  } = defaultMetaData.find((metaData) => metaData.pageName === page);

  const getTitle = (title) => (pageNumber > 1
    ? `${title} | Page ${pageNumber}`
    : title);

  const getDescription = (description) => (pageNumber > 1
    ? `${description} | Page ${pageNumber}`
    : description);

  const getImage = () => {
    if (ogImage) return ogImage;

    if (isArticle) return image;

    return getPathWithCdn('/apple-touch-icon.png');
  };

  const date = isArticle ? publishedAt : new Date();
  const type = isArticle ? 'article' : 'website';

  const title = metaTitle || defaultMetaTitle;
  const description = metaDescription || defaultMetaDescription;
  const robots = !IS_PROD ? 'none' : metaRobots;

  return (
    <Fragment>
      <Head>
        <title>{getTitle(title)}</title>
        <meta name="description" content={getDescription(description)} />
        <meta name="date" content={date} />
        {robots && <meta name="robots" content={robots} />}
        <link rel="canonical" href={url} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={type} />
        <meta property="og:description" content={getDescription(description)} />
        <meta property="og:title" content={getTitle(title)} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={getImage()} />
        {categoryTag && <meta property="article:section" content={categoryTag} />}
        {publishedAt && <meta property="article:published_time" content={publishedAt} />}
        {keyWords?.map((keyWord) => (
          <meta
            key={`meta/tag/${keyWord}`}
            property="article:tag"
            content={keyWord}
          />
        ))}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="google-site-verification" content="Ou5rI476W6QK1BYTyVkJaDjTwbCFy7jdbEO5etMIi0k" />
        <link rel="shortcut icon" href={getPathWithCdn('/yellow_logo.ico')} />
        <link rel="apple-touch-icon" sizes="180x180" href={getPathWithCdn('/apple-touch-icon.png')} />
        <link rel="mask-icon" href={getPathWithCdn('/safari-pinned-tab.svg')} color="#ffbf02" />
        <link rel="manifest" href="/manifest.json" />
        {children}
      </Head>
      {!isEmpty(pageMicrodata) && (
        <Script
          id={`JSON-LD-${pageMicrodata.name}`}
          key={`JSON-LD-${pageMicrodata.name}`}
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageMicrodata) }}
        />
      )}
      {!isEmpty(breadcrumbs) && (
        <Script
          id="JSON-LD-breadcrumbs"
          key="JSON-LD-breadcrumbs"
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(microdata.breadcrumbs({ breadcrumbsList: breadcrumbs })),
          }}
        />
      )}
    </Fragment>
  );
};

MetaTags.defaultProps = {
  pageMicrodata: {},
  children: null,
  pageMetadata: {},
  breadcrumbs: [],
  isArticle: false,
  defaultMetaData: ogMetaData,
};

MetaTags.propTypes = {
  page: PropTypes.string.isRequired,
  pageMicrodata: PropTypes.instanceOf(Object),
  breadcrumbs: PropTypes.instanceOf(Array),
  pageMetadata: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    image: PropTypes.string,
    ogImage: PropTypes.string,
    publishedAt: PropTypes.string,
    categoryTag: PropTypes.string,
    keyWords: PropTypes.instanceOf(Array),
    pageNumber: PropTypes.number,
  }),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
  isArticle: PropTypes.bool,
  defaultMetaData: PropTypes.instanceOf(Array),
};

export default MetaTags;
