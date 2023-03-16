import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { selectArticle } from 'redux/selectors/blog';
import { getArticleProps } from 'containers/Article/utils/propsHelper';
import Article from 'components/BlogCommon/Article';
import FullLayout from 'components/Layout/FullLayout';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import FAQ from 'UI/containers/FAQ';

const DraftArticle = ({ introSection, currentArticle }) => {
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
  currentArticle: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ currentArticle: selectArticle(state) }),
)(DraftArticle);
