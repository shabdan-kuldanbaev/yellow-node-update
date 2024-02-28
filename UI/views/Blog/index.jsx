'use client';

import { useContext } from 'react';
import dynamic from 'next/dynamic';
import {
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import Paginator from 'UI/components/Paginator';
import SelectionBlock from 'components/BlogCommon/SelectionBlock';
import ArticlesList from 'components/BlogCommon/ArticlesList';
import PageHeader from 'UI/components/PageHeader';
import FullLayout from 'components/Layout/FullLayout';
import FullscreenSearch from 'components/BlogCommon/FullscreenSearch';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import FullscreenSubscribe from 'components/BlogCommon/FullscreenSubscribe';
import {
  ARTICLES_NUMBER_PER_PAGE,
  ROUTES,
  SVG_IMAGES_TYPES,
} from 'utils/constants';
import useToggle from 'hooks/useToggle';
import { IntroSectionContext } from 'utils/appContext';
import { routes } from 'utils/routes';
import styles from './BlogContainer.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const BlogContainer = ({
  articles,
  totalArticles,
  currentPage,
  children,
  breadcrumbs,
}) => {
  const [subscribe, { isLoading }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const introSection = useContext(IntroSectionContext);

  const [isFullscreenSearch, toggleFullscreenSearch] = useToggle(false);
  const [isFullscreenSubscribe, toggleFullscreenSubscribe] = useToggle(false);

  const pathname = usePathname();

  const pagesCounter = Math.ceil(totalArticles / ARTICLES_NUMBER_PER_PAGE);

  const pageTitle = '';

  const handleOnFormSubmit = (email) => {
    if (isLoading) {
      return;
    }

    subscribe({ email, pathname });
  };

  const { push: navigateTo } = useRouter();
  const category = useSearchParams().get('category');

  const handlePageChange = (page) => {
    const { path } = routes.blog.getRoute(category, page);

    window.scrollTo(0, 0);
    navigateTo(path);
  };

  return (
    <>
      {children}
      <FullLayout introSection={introSection}>
        <PageHeader
          title={pageTitle || ROUTES.blog.title}
          titleStyles={styles.title}
          breadcrumbs={breadcrumbs}
          breadcrumbsTheme="dark"
        >
          <Svg
            type={SVG_IMAGES_TYPES.searchLg}
            handleOnClick={toggleFullscreenSearch}
            className={styles.searchButton}
          />
        </PageHeader>

        <SelectionBlock
          toggleFullscreenSearch={toggleFullscreenSearch}
          toggleFullscreenSubscribe={toggleFullscreenSubscribe}
        />

        <ArticlesList
          articles={articles}
          isBlogPage
          currentPage={currentPage}
          toggleFullscreenSubscribe={toggleFullscreenSubscribe}
        />

        {!!pagesCounter && (
          <Paginator
            pagesCounter={pagesCounter}
            currentPage={currentPage}
            pageSlug={ROUTES.blog.slug}
            onPageChange={handlePageChange}
          />
        )}
      </FullLayout>

      <FullscreenSearch
        isFullscreenSearch={isFullscreenSearch}
        closeFullscreenSearch={toggleFullscreenSearch}
      />
      <FullscreenSubscribe
        isFullscreenSubscribe={isFullscreenSubscribe}
        closeFullscreenSubscribe={toggleFullscreenSubscribe}
        handleOnSubmit={handleOnFormSubmit}
      />
    </>
  );
};

export default BlogContainer;
