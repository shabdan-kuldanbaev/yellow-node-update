'use client';

import { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams, usePathname } from 'next/navigation';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import PageHeader from 'UI/components/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import Article from 'components/BlogCommon/Article';
import SubscribeBlock from 'components/Common/SubscribeBlock';
import FullLayout from 'components/Layout/FullLayout';
import { ShareThumbnails } from 'components/BlogCommon/Article/ShareThumbnails';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import usePageClusters from 'hooks/usePageClusters';
import { IntroSectionContext, PageClustersContext } from 'utils/appContext';
import { routes } from 'utils/routes';
import { getArticleProps } from './utils/propsHelper';

const FAQ = dynamic(() => import('UI/containers/FAQ'));

const ArticleContainer = ({ data }) => {
  const [subscribe, { isLoading: isSubscribeLoading }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const introSection = useContext(IntroSectionContext);

  const {
    article,
    clusters,
    next: olderArticle,
    prev: newerArticle,
    related,
  } = data;

  const { setPageClusters } = useContext(PageClustersContext);

  useEffect(() => {
    setPageClusters(clusters || []);
  }, [clusters, setPageClusters]);

  const pageClusters = usePageClusters();

  const pathname = usePathname();
  const { slug } = useParams();

  // const { slug: prevArticleSlug } = olderArticle;
  // const { slug: nextArticleSlug } = newerArticle;

  const {
    slug: articleSlug,
    title,
    oldBody,
    body,
    introduction,
    publishedAt,
    updatedAt,
    tagsList,
    categoryTag = '',
    metaTitle,
    metaDescription,
    headImage,
    author,
    faqList,
  } = getArticleProps({ article });
  const articleMetadata = {
    metaTitle: metaTitle || (title && `${title} | Yellow`),
    metaDescription: metaDescription || (title && `Read our new article about ${title}.`),
    publishedAt,
    image: headImage.url,
    keyWords: tagsList.map((tag) => tag.title),
    categoryTag,
    slug: articleSlug,
    url: `${rootUrl}${pathname}`,
  };

  const articleData = {
    metaTitle,
    title,
    publishedAt,
    updatedAt,
    headImage: headImage.url,
    articleBody: oldBody || documentToPlainTextString(body),
    author,
  };
  const breadcrumbs = getBreadcrumbs(PAGES.article, { title, slug: articleSlug });

  const handleOnFormSubmit = (email) => {
    if (isSubscribeLoading) {
      return;
    }

    subscribe({
      email,
      pathname,
      pageClusters,
    });
  };

  return (
    <>
      <MetaTags
        page={PAGES.article}
        isArticle
        pageMetadata={articleMetadata}
        breadcrumbs={breadcrumbs}
        microData={articleData}
      />
      <FullLayout>
        <PageHeader
          breadcrumbs={breadcrumbs}
          breadcrumbsTheme="dark"
        />
        <Article
          slug={articleSlug}
          title={title}
          oldBody={oldBody}
          body={body}
          introduction={introduction}
          headImage={headImage}
          introSection={introSection}
          author={author}
          publishedAt={publishedAt}
        />
        <ShareThumbnails
          url={`${rootUrl}${routes.article.getRoute(slug).path}`}
          title={title}
        />
        <FullLayout
          disableMaxWidth
          disableTopPadding
          disableSidePadding
          disableBottomPadding
        >
          {!!faqList.length && (
            <FAQ
              isArticalPage
              faqList={faqList}
            />
          )}
        </FullLayout>

        <TagsBlock tags={tagsList} />

        {/* TODO: Fix slider for related articles */}

        {/* {related?.length && <RelatedSection articles={related} />} */}

        {/* <div className={styles.nextPrevSection}>
          <NextPrev slug={prevArticleSlug} />
          <NextPrev
            isNewer
            slug={nextArticleSlug}
          />
        </div> */}
        <SubscribeBlock handleOnSubmit={handleOnFormSubmit} />
      </FullLayout>
    </>
  );
};

export default ArticleContainer;
