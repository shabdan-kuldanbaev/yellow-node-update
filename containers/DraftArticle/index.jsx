import PropTypes from 'prop-types';
import Head from 'next/head';
import { getArticleProps } from 'containers/Article/utils/propsHelper';
import Article from 'components/BlogCommon/Article';
import FullLayout from 'components/Layout/FullLayout';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import FAQ from 'UI/containers/FAQ';
import { getDraftArticle } from 'utils/dataFetching/getDraftArticle';

const DraftArticle = ({ introSection, slug }) => {
  const currentArticle = getDraftArticle(slug);

  const {
    slug: articleSlug,
    title,
    oldBody,
    body,
    introduction,
    publishedAt,
    tagsList,
    headImage,
    author,
    faqList,
  } = getArticleProps({ article: currentArticle });

  return (
    <>
      <Head>
        <meta
          name="robots"
          content="none"
        />
      </Head>
      <FullLayout>
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
        <TagsBlock tags={tagsList} />
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
      </FullLayout>
    </>
  );
};

DraftArticle.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default DraftArticle;
