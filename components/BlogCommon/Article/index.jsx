import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { selectArticle, selectIsLoading } from 'redux/selectors/blog';
import { getArticle } from 'redux/actions/blog';
import { Loader } from 'components';
import { useDispatch, useSelector } from 'react-redux';

export const Article = () => {
  const { query: { article } } = useRouter();
  const dispatch = useDispatch();
  const currentArticle = useSelector((state) => selectArticle(state));
  const isLoading = useSelector((state) => selectIsLoading(state));

  useEffect(() => {
    if (article) dispatch(getArticle(article));
  }, []);

  return (
    <Loader isLoading={!isLoading}>
      <section style={{ marginTop: '200px', color: 'white' }}>
        <span>{currentArticle.id}</span>
        <br />
        <br />
        <span>{currentArticle.title}</span>
        <span>{currentArticle.publishedDate}</span>
        <p>{currentArticle.description}</p>
        <img src={currentArticle.image} alt="" />
      </section>
    </Loader>
  );
};
