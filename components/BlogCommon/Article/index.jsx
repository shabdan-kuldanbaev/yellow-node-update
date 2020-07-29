import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { selectArticle, selectIsLoading } from 'redux/selectors/blog';
import { getArticle } from 'redux/actions/blog';
import { Loader } from 'components';
import styles from './styles.module.scss';

const Article = ({
  currentArticle,
  isLoading,
  getArticle: getCurrentArticle,
}) => {
  const { query: { article } } = useRouter();

  useEffect(() => {
    if (article) getCurrentArticle(article);
  }, []);

  return (
    <Loader isLoading={!isLoading}>
      <section className={styles.article}>
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

Article.propTypes = {
  currentArticle: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentArticle: selectArticle(state),
  isLoading: selectIsLoading(state),
});

export default connect(mapStateToProps, { getArticle })(Article);
