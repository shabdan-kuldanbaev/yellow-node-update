import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Paginator from 'UI/components/Paginator';
import SelectionBlock from 'components/BlogCommon/SelectionBlock';
import ArticlesList from 'components/BlogCommon/ArticlesList';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'UI/components/PageHeader';
import FullLayout from 'components/Layout/FullLayout';
import FullscreenSearch from 'components/BlogCommon/FullscreenSearch';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import { getPage } from 'utils/dataFetching/getPage';
import { useGetArticlesListQuery } from 'store/apis/blog';
import FullscreenSubscribe from 'components/BlogCommon/FullscreenSubscribe';
import { rootUrl } from 'utils/helper';
import { PAGES, ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import useToggle from 'hooks/useToggle';
import { categoriesMetaData } from './utils/data';
import { findCategoryBySlug, findTagBySlug } from './utils/blogContainerHelper';
import styles from './BlogContainer.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const BlogContainer = async ({
  tagsList,
  introSection,
  currentPage,
  articlesNumberPerPage,
  query,
}) => {
  const [subscribe, { isLoading }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const { data: { metaData } = {} } = await getPage(PAGES.blog);
  const { data = {} } = useGetArticlesListQuery(query);
  const { items: articles, total: totalArticles } = data;

  const [isFullscreenSearch, toggleFullscreenSearch] = useToggle(false);
  const [isFullscreenSubscribe, toggleFullscreenSubscribe] = useToggle(false);

  const {
    pathname,
    query: { slug },
  } = useRouter();

  const tag = findTagBySlug(tagsList, slug);
  const category = findCategoryBySlug(categoriesMetaData, slug);

  const pagesCounter = Math.ceil(totalArticles / articlesNumberPerPage);
  const breadcrumbs = getBreadcrumbs(PAGES.blog, { slug, tagsList });
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/${PAGES.blog}`,
    pageNumber: currentPage,
  };

  if (tag || category) {
    pageMetadata.metaRobots = 'noindex,follow';
  }

  let pageTitle = '';

  if (category) {
    const {
      metaTitle: categoryMetaTitle,
      metaDescription: categoryMetaDescription,
      pageTitle: categoryTitle,
    } = category;

    pageMetadata.metaTitle = categoryMetaTitle;
    pageMetadata.metaDescription = categoryMetaDescription;
    pageTitle = categoryTitle;
  }

  if (tag) {
    const {
      title: tagTitle,
      description: tagDescription,
    } = tag;

    pageMetadata.metaTitle = `Tag: ${tagTitle} | Yellow`;
    pageMetadata.metaDescription = tagDescription;
    pageTitle = tagTitle;
  }

  const handleOnFormSubmit = (email) => {
    if (isLoading) {
      return;
    }

    subscribe({ email, pathname });
  };

  return (
    <>
      <MetaTags
        page={PAGES.blog}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
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

BlogContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentPage: PropTypes.number.isRequired,
  articlesNumberPerPage: PropTypes.number.isRequired,
};

export default BlogContainer;
