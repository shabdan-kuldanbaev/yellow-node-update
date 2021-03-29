import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from 'utils/constants';
import { rootUrl, isCustomDomain } from 'utils/helper';
import { isArticle } from 'utils/blogUtils';
import { ogMetaData } from './utils/data';

export const MetaTags = ({
  page,
  ogMetaData: ogData,
  articleMetadata,
  children,
  microdata,
}) => {
  const { asPath } = useRouter();
  const {
    metaTitle,
    metaDescription,
    image,
    publishedAt,
    categoryTag,
    keyWords,
    slug,
  } = articleMetadata;
  const isArticlePage = isArticle(slug);
  const isBlogCategory = (page === ROUTES.blog.slug && !isArticlePage);

  const getTitle = (title) => (isArticlePage ? metaTitle : title);
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
            <meta property="og:image" content={getImage('/apple-touch-icon.png')} />
            {categoryTag && <meta property="article:section" content={categoryTag} />}
            {publishedAt && <meta property="article:published_time" content={publishedAt} />}
            {keyWords && keyWords.map((keyWord) => (
              <meta property="article:tag" content={keyWord} />
            ))}
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <meta name="google-site-verification" content="Ou5rI476W6QK1BYTyVkJaDjTwbCFy7jdbEO5etMIi0k" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
            <link rel="shortcut icon" href="/yellow_logo.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffbf02" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
            {!isEmpty(microdata) && (
              <script
                key={`JSON-LD-${microdata.name}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata) }}
              />
            )}
            {!isCustomDomain && <meta name="robots" content="none" />}
          </Fragment>
        ))}
      {children}
    </Head>
  );
};

MetaTags.defaultProps = {
  page: '',
  ogMetaData,
  articleMetadata: {},
  microdata: {},
};

MetaTags.propTypes = {
  page: PropTypes.string,
  ogMetaData: PropTypes.instanceOf(Array),
  articleMetadata: PropTypes.instanceOf(Object),
  children: PropTypes.node,
  microdata: PropTypes.instanceOf(Object),
};
