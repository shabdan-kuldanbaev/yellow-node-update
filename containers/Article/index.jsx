'use client';

import { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams, usePathname } from 'next/navigation';
import PageHeader from 'UI/components/PageHeader';
import Article from 'components/BlogCommon/Article';
import SubscribeBlock from 'components/Common/SubscribeBlock';
import FullLayout from 'components/Layout/FullLayout';
import { ShareThumbnails } from 'components/BlogCommon/Article/ShareThumbnails';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import { rootUrl } from 'utils/helper';
import usePageClusters from 'hooks/usePageClusters';
import { IntroSectionContext, PageClustersContext } from 'utils/appContext';
import { routes } from 'utils/routes';

const FAQ = dynamic(() => import('UI/containers/FAQ'));

const ArticleContainer = ({ data, children, breadcrumbs }) => {
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
    metaTitle,
    headImage,
    author,
    faqList,
  } = article;

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
      {children}
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
