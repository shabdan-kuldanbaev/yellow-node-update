import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cn from 'classnames';
import { Animated, LinkWrapper } from 'components';
import {
  ANIMATED_TYPE,
  ROUTES,
  BREADCRUBS_SLUGS,
  CATEGORY_TAGS,
  CATEGORY_SLUGS,
} from 'utils/constants';
import { isNumeric } from 'utils/helper';
import { isArticle } from 'utils/blogUtils';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const Breadcrumbs = ({
  articleTitle,
  className,
}) => {
  const { asPath, query: { slug } } = useRouter();
  const isHomePage = asPath === ROUTES.homepage.path;
  const isArticlePage = isArticle(slug);
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (asPath) {
      const linkPaths = asPath.split('/');
      linkPaths.shift();

      const pathArray = linkPaths.filter((path) => !isNumeric(path)).map((path, i) => {
        const isArticleBreadcrumsItem = isArticlePage && (articleTitle && (slug === path));
        const fullPath = linkPaths.filter((linkPath, index) => index <= i).reduce((acc, partOfPath) => `${acc}/${partOfPath}`, '');

        if (isArticleBreadcrumsItem) {
          return ({
            breadcrumbTitle: articleTitle,
            href: fullPath,
          });
        }

        if (CATEGORY_SLUGS.includes(path)) {
          return ({
            breadcrumbTitle: CATEGORY_TAGS[path],
            href: fullPath,
          });
        }

        return ({
          breadcrumbTitle: BREADCRUBS_SLUGS[path].title,
          href: fullPath,
        });
      });

      setBreadcrumbs(pathArray);
    }
  }, [asPath]);

  return (breadcrumbs && !isHomePage
    && (
      <Fragment>
        <Head>
          <script
            key="JSON-LD-breadcrumbs"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata.breadcrumbs({ breadcrumbsList: breadcrumbs })) }}
          />
        </Head>
        <div
          aria-label="breadcrumbs"
          className={cn(styles.breadcrumbs, { [className]: className })}
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
                <Fragment key={`breadcrump/${breadcrumb.breadcrumbTitle}/${index}`}>
                  <span className={styles.separator}>/</span>
                  <li key={breadcrumb.href}>
                    {index === breadcrumbsArray.length - 1 ? (
                      <span>
                        {breadcrumb.breadcrumbTitle}
                      </span>
                    ) : (
                      <LinkWrapper
                        path={breadcrumb.href}
                        isLocalLink
                      >
                        {breadcrumb.breadcrumbTitle}
                      </LinkWrapper>

                    )}
                  </li>
                </Fragment>
              ))}
            </ol>
          </Animated>
        </div>
      </Fragment>
    )
  );
};

export default Breadcrumbs;
