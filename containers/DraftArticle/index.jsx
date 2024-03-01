'use client';

import { useContext } from 'react';
import PropTypes from 'prop-types';
import Article from 'components/BlogCommon/Article';
import FullLayout from 'components/Layout/FullLayout';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import FAQ from 'UI/containers/FAQ';
import { IntroSectionContext } from 'utils/appContext';
import { getArticleProps } from 'utils/contentful/getArticleProps';

const DraftArticle = ({ article }) => {
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
  } = getArticleProps({ article });

  const introSection = useContext(IntroSectionContext);

  return (
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
  );
};

DraftArticle.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default DraftArticle;
