import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { loadArticles } from 'redux/actions/blog';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
import {
  SectionTitle,
  ButtonMore,
  Animated,
} from 'components';
import { Post } from 'components/TemporaryBlog';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

const Blog = ({
  isLoading,
  articles,
  loadArticles: loadPartOfArticles,
}) => {
  const { asPath } = useRouter();
  const currentPage = 1;

  useEffect(() => {
    loadPartOfArticles({
      currentPage,
      currentLimit: 5,
      category: 'latest',
    });
  }, []);

  return (
    <section className={styles.blog}>
      <SectionTitle title="Blog" subtitle="How we do what we do" />
      {/*
      TODO
      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        asPath={asPath}
        currentPage={currentPage}
      /> */}
      <div className={styles.postsContainer}>
        {articles && articles.slice(0, 3).map((article) => <Post key={article.id} post={article} />)}
      </div>
      <Animated
        type={animatedType.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={200}
      >
        <ButtonMore
          href="/blog?category=latest&page=1"
          title="READ MORE STORIES"
          buttonStyle={styles.blogButton}
        />
      </Animated>
    </section>
  );
};

Blog.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  loadArticles: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state),
  }), { loadArticles },
)(Blog);
