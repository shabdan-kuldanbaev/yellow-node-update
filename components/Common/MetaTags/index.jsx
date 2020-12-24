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
        </Fragment>
      ))}
    {children && children}
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
