import React, { useEffect } from 'react';
import {
  SectionTitle,
  ButtonMore,
  Articles,
} from 'components';
import { loadArticles } from 'redux/actions/blog';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Blog = ({
  isLoading,
  articles,
  loadArticles: loadPartOfArticles,
}) => {
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

Blog.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  loadArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  articles: selectArticles(state),
});

export default connect(mapStateToProps, { loadArticles })(Blog);
