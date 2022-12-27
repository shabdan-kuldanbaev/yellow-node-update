import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectArticles } from 'redux/selectors/blog';
import Animated from 'components/Common/Animated';
import { ArticlesList } from 'components/BlogCommon/ArticlesList';
import Button from 'UI/components/Button';
import SectionTitle from 'UI/components/SectionTitle';
import {
  ANIMATED_TYPE,
  HOMEPAGE_BLOG_CURRENT_PAGE,
  ROUTES,
} from 'utils/constants';
import { useBlog } from './utils/useBlog';
import styles from './styles.module.scss';

const Blog = (props) => {
  const { title, description, articles } = useBlog(props);

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
        <Button
          secondary
          href={ROUTES.blog.path}
          className={styles.blogButton}
        >
          Read more
        </Button>
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
