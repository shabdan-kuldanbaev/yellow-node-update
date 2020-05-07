import React, { useEffect } from 'react';
import { SectionTitle, ButtonMore } from 'components';
import { Articles } from 'components/BlogCommon';
import { connect } from 'react-redux';
import { loadArticles } from 'redux/actions/blog';
import { tagsForBlog } from 'utils/constants';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
import styles from './styles.module.scss';

const Blog = ({
  articles,
  isLoading,
  loadArticles: loadNewArticles,
}) => {
  const currentPage = 1;
  const currentLimit = 5;
  const category = tagsForBlog.latest.name;

  useEffect(() => {
    loadNewArticles({ currentPage, currentLimit, category });
  }, []);

  return (
    <section className={styles.blog}>
      <SectionTitle title="Blog" subtitle="How we do what we do" />
      <Articles
        articles={articles}
        isLoading={isLoading}
        page={currentPage}
      />
      <ButtonMore
        href="/blog?category=latest&page=1"
        title="Read more stories"
        buttonStyle={styles.blogButton}
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  articles: selectArticles(state),
});

export default connect(mapStateToProps, { loadArticles })(Blog);
