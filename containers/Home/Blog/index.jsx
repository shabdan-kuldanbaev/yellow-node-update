import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectArticles } from 'redux/selectors/blog';
import {
  SectionTitle,
  ButtonMore,
  Animated,
  ArticlesList,
} from 'components';
import {
  ANIMATED_TYPE,
  CURRENT_PAGE_NUMBER,
  ROUTES,
} from 'utils/constants';
import styles from './styles.module.scss';

const Blog = ({ articles }) => (
  <section className={styles.blog}>
    <SectionTitle title="Blog" subtitle="How we do what we do" />
    <ArticlesList articles={articles} currentPage={CURRENT_PAGE_NUMBER} />
    <Animated
      type={ANIMATED_TYPE.isCustom}
      translateY="2.82352941em"
      opasityDuration={1}
      transformDuration={1}
      transitionDelay={200}
    >
      <ButtonMore
        href={ROUTES.blog.path}
        dynamicRouting={ROUTES.blog.dynamicPath}
        title="READ MORE STORIES"
        buttonStyle={styles.blogButton}
      />
    </Animated>
  </section>
);

Blog.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};

export default connect(
  (state) => ({ articles: selectArticles(state) }),
)(Blog);
