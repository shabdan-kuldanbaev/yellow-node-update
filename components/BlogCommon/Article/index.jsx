import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { selectArticle, selectIsLoading } from 'redux/selectors/blog';
import { connect } from 'react-redux';
import { getArticle } from 'redux/actions/blog';
import { Loader } from 'components';

const Article = ({
  currentArticle,
  getArticle: getArticleAction,
  isLoading,
}) => {
  const { query: { article } } = useRouter();

  useEffect(() => {
    if (article) getArticleAction(article);
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

const mapStateToProps = (state) => ({
  currentArticle: selectArticle(state),
  isLoading: selectIsLoading(state),
});

export default connect(mapStateToProps, { getArticle })(Article);
