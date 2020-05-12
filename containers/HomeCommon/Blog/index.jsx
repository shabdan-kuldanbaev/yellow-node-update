import React, { useEffect } from 'react';
import {
  SectionTitle,
  ButtonMore,
  Articles,
} from 'components';
import { loadArticles } from 'redux/actions/blog';
import { tagsForBlog } from 'utils/constants';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';

export const Blog = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectIsLoading(state));
  const articles = useSelector((state) => selectArticles(state));

  const currentPage = 1;
  const currentLimit = 5;
  const category = tagsForBlog.latest.name;

  useEffect(() => {
    dispatch(loadArticles({ currentPage, currentLimit, category }));
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
