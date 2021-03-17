import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { ogMetaData } from './utils/data';

export const MetaTags = ({
  page,
  ogMetaData: ogData,
  articleMetaData,
  children,
}) => {
  const { asPath, pathname } = useRouter();
  const isBlogCategory = (page === ROUTES.blog.slug && pathname.includes('[page]'));
  const isArticle = (page === ROUTES.blog.slug && !pathname.includes('[page]'));

  const getTitle = (title) => (isArticle && articleMetaData.metaTitle) || title;
  const getDescription = (description) => (isArticle && articleMetaData.metaDescription) || description;
  const getImage = (img) => (isArticle && articleMetaData.image) || img;
  const getUrl = (url) => ((isArticle || isBlogCategory) && `${rootUrl}${asPath}`) || url;
  const getDate = (date) => (isArticle && articleMetaData.date) || date;
  const getType = () => (isArticle ? 'article' : 'website');

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
            <title itemProp="headline">{getTitle(title)}</title>
            <meta name="description" content={getDescription(description)} />
            <meta name="date" content={getDate(new Date())} />
            <link rel="canonical" href={getUrl(url)} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={getType()} />
            <meta property="og:description" content={getDescription(description)} />
            <meta property="og:title" content={getTitle(title)} />
            <meta property="og:url" content={getUrl(url)} />
            <meta property="og:image" content={getImage('/apple-touch-icon.png')} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <meta name="google-site-verification" content="Ou5rI476W6QK1BYTyVkJaDjTwbCFy7jdbEO5etMIi0k" />
            <link rel="shortcut icon" href="/yellow_logo.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffbf02" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
          </Fragment>
        ))}
      {children}
    </Head>
  );
};

MetaTags.defaultProps = {
  page: '',
  ogMetaData,
  articleMetaData: {},
};

MetaTags.propTypes = {
  page: PropTypes.string,
  ogMetaData: PropTypes.instanceOf(Array),
  articleMetaData: PropTypes.instanceOf(Object),
  children: PropTypes.node,
};
