/* eslint-disable react/jsx-max-props-per-line */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import isEmpty from 'lodash/isEmpty';
import { getPathWithCdn } from 'utils/helper';
import { microdata } from 'utils/microdata';
import { ogMetaData } from './utils/data';

export const MetaTags = ({
  page,
  pageMetadata,
  children,
  pageMicrodata,
  breadcrumbs,
  faqList,
  isArticle,
  defaultMetaData,
}) => {
  const {
    metaTitle,
    metaDescription,
    image,
    publishedAt,
    categoryTag,
    keyWords,
    pageNumber,
    url,
  } = pageMetadata;

  const {
    metaTitle: defaultMetaTitle,
    metaDescription: defaultMetaDescription,
  } = defaultMetaData.find((metaData) => metaData.pageName === page);

  const getTitle = (title) => ((pageNumber && pageNumber !== 1)
    ? `Page ${pageNumber}. ${title}`
    : title);
  const getImage = (img) => (isArticle ? image : img);
  const date = isArticle ? publishedAt : new Date();
  const type = isArticle ? 'article' : 'website';

  const title = metaTitle || defaultMetaTitle;
  const description = metaDescription || defaultMetaDescription;

  return (
    <Head>
      <Fragment key={`meta/${title}`}>
        <title>{getTitle(title)}</title>
        <meta name="description" content={description} />
        <meta name="date" content={date} />
        <link rel="canonical" href={url} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={type} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={getTitle(title)} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={getImage(getPathWithCdn('/apple-touch-icon.png'))} />
        {categoryTag && <meta property="article:section" content={categoryTag} />}
        {publishedAt && <meta property="article:published_time" content={publishedAt} />}
        {keyWords && keyWords.map((keyWord) => (
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
        {!isEmpty(pageMicrodata) && (
          <script
            key={`JSON-LD-${pageMicrodata.name}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(pageMicrodata) }}
          />
        )}
        {!isEmpty(breadcrumbs) && (
          <script
            key="JSON-LD-breadcrumbs"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(microdata.breadcrumbs({ breadcrumbsList: breadcrumbs })),
            }}
          />
        )}
        {!isEmpty(faqList) && (
          <script
            key="JSON-LD-faq"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(microdata.faq({ faqList })),
            }}
          />
        )}
      </Fragment>
      {children}
    </Head>
  );
};

MetaTags.defaultProps = {
  pageMicrodata: {},
  children: null,
  pageMetadata: {},
  breadcrumbs: [],
  faqList: [],
  isArticle: false,
  defaultMetaData: ogMetaData,
};

MetaTags.propTypes = {
  page: PropTypes.string.isRequired,
  pageMicrodata: PropTypes.instanceOf(Object),
  breadcrumbs: PropTypes.instanceOf(Array),
  faqList: PropTypes.instanceOf(Array),
  pageMetadata: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    image: PropTypes.string,
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
  defaultMetaData: PropTypes.instanceOf(Object),
};
