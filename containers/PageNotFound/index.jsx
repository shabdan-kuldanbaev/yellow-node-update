import React, { Fragment } from 'react';
import { MetaTags, LinkWrapper } from 'components';
import { pages } from 'utils/constants';
import styles from './styles.module.scss';

export const PageNotFound = () => (
  <Fragment>
    <MetaTags page={pages.notFound} />
    <div className={styles.pageNotFound}>
      <p>Page not found :(</p>
      <LinkWrapper path="/" isLocalLink>Go to Yellow!</LinkWrapper>
    </div>
  </Fragment>
);
