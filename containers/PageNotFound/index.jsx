import React, { Fragment } from 'react';
import { MetaTags } from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

export const PageNotFound = () => (
  <Fragment>
    <MetaTags page={PAGES.notFound} />
    <div className={styles.pageNotFound}>
      404 | This page could not be found
    </div>
  </Fragment>
);
