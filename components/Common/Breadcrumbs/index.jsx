import React, { Fragment } from 'react';
import Head from 'next/head';
import cn from 'classnames';
import { Animated, LinkWrapper } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const Breadcrumbs = ({
  breadcrumbs,
}) => (breadcrumbs
  ? (
    <Fragment>
      <Head>
        <script
          key="JSON-LD-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(microdata.breadcrumbs({ breadcrumbsList: breadcrumbs })),
          }}
        />
      </Head>
      <div
        aria-label="breadcrumbs"
        className={styles.breadcrumbs}
      >
        <Animated
          type={ANIMATED_TYPE.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={150}
        >
          <ol>
            <li>
              <LinkWrapper
                path="/"
                isLocalLink
              >
                Home
              </LinkWrapper>
            </li>
            {breadcrumbs.map((breadcrumb, index, breadcrumbsArray) => (
              <Fragment key={`breadcrump/${breadcrumb.title}/${index}`}>
                <span className={styles.separator}>/</span>
                <li key={breadcrumb.to}>
                  {index === breadcrumbsArray.length - 1 ? (
                    <span>
                      {breadcrumb.title}
                    </span>
                  ) : (
                    <LinkWrapper
                      path={breadcrumb.to}
                      isLocalLink
                    >
                      {breadcrumb.title}
                    </LinkWrapper>

                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </Animated>
      </div>
    </Fragment>
  ) : null);

export default Breadcrumbs;
