import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import PageHeader from 'components/Common/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import Article from 'components/BlogCommon/Article';
import SubscribeBlock from 'components/Common/SubscribeBlock';
import FullLayout from 'components/Layout/FullLayout';
import NextPrev from 'components/BlogCommon/Article/NextPrev';
import { ShareThumbnails } from 'components/BlogCommon/Article/ShareThumbnails';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import RelatedSection from 'components/BlogCommon/Article/RelatedSection';
import PageNotFound from 'containers/PageNotFound';
import FAQ from 'UI/containers/FAQ';
import { useGetArticleQuery } from 'redux/apis/blog';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { getArticleProps } from './utils/propsHelper';
import styles from './styles.module.scss';

const ArticleContainer = ({
  introSection,
  query,
}) => {
  const [subscribe, { isLoading: isSubscribeLoading }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const { data = {}, isError, isLoading } = useGetArticleQuery(query);
  const {
    article,
    next: olderArticle,
    prev: newerArticle,
    related,
  } = data;

  const {
    query: { slug },
    pathname,
    asPath,
  } = useRouter();

  if (isError) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return null;
  }

  const { slug: prevArticleSlug } = olderArticle;
  const { slug: nextArticleSlug } = newerArticle;

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
    image: headImage,
    keyWords: tagsList.map((tag) => tag.title),
    categoryTag,
    slug: articleSlug,
    url: `${rootUrl}${asPath}`,
  };
  const articleMicrodata = microdata.article({
    metaTitle,
    title,
    publishedAt,
    updatedAt,
    headImage,
    articleBody: oldBody || documentToPlainTextString(body),
    author,
  });
  const breadcrumbs = pagesBreadcrumbs.article(title, articleSlug);

  const handleOnFormSubmit = (email) => {
    if (isSubscribeLoading) {
      return;
    }

    subscribe({ email, pathname });
  };

  return (
    <>
      <MetaTags
        page={PAGES.blog}
        isArticle
        pageMetadata={articleMetadata}
        pageMicrodata={articleMicrodata}
        breadcrumbs={breadcrumbs}
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
          url={`${rootUrl}/blog/${slug}`}
          title={title}
        />
        <FullLayout
          disableMaxWidth
          disableTopPadding
          disableSidePadding
          disableBottomPadding
        >
          <FAQ
            isArticalPage
            faqList={faqList}
          />
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

ArticleContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default ArticleContainer;
