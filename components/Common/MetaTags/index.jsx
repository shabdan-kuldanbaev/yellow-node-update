import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ogMetaData } from './utils/data';

export const MetaTags = ({
  page,
  ogMetaData: ogData,
  children,
}) => (
  <Head>
    {page && ogData && ogData.filter(({ pageName }) => pageName === page)
      .map(({
        title,
        description,
        keywords,
        url,
      }) => (
        <Fragment>
          <title>{title}</title>
          <title itemProp="headline">{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <link rel="canonical" href={url} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content="/apple-touch-icon.png" />
          <meta charset="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="referrer" content="always" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="google-site-verification" content="Ou5rI476W6QK1BYTyVkJaDjTwbCFy7jdbEO5etMIi0k" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
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

MetaTags.defaultProps = {
  page: '',
  ogMetaData,
};

MetaTags.propTypes = {
  page: PropTypes.string,
  ogMetaData: PropTypes.instanceOf(Array),
  children: PropTypes.instanceOf(Object).isRequired,
};
