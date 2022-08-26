import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectArticles } from 'redux/selectors/blog';
import Animated from 'components/Common/Animated';
import { ArticlesList } from 'components/BlogCommon/ArticlesList';
import ButtonMore from 'components/Common/ButtonMore';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import {
  ANIMATED_TYPE,
  HOMEPAGE_BLOG_CURRENT_PAGE,
  ROUTES,
} from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const Blog = ({ articles, sectionData }) => {
  const { title, description } = getDocumentFields(sectionData, ['title', 'description']);

  return (
    <section className={styles.blog}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <ArticlesList
        articles={articles.slice(0, 3)}
        currentPage={HOMEPAGE_BLOG_CURRENT_PAGE}
      />
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={200}
      >
        <ButtonMore
          href={ROUTES.blog.path}
          title="Read more"
          buttonStyle={styles.blogButton}
        />
      </Animated>
    </section>
  );
};

Blog.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  sectionData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ articles: selectArticles(state) }),
)(Blog);
