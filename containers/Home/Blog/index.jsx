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
  ArticlesList,
} from 'components';
import {
  ANIMATED_TYPE,
  CURRENT_PAGE_NUMBER,
  ROUTES,
} from 'utils/constants';
import styles from './styles.module.scss';

const Blog = ({
  isLoading,
  articles,
}) => {
  const { asPath } = useRouter();

  return (
    <section className={styles.blog}>
      <SectionTitle title="Blog" subtitle="How we do what we do" />
      <ArticlesList
        articles={articles}
        asPath={asPath}
        currentPage={CURRENT_PAGE_NUMBER}
      />
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={200}
      >
        <ButtonMore
          href={ROUTES.blog}
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
};

export default connect(
  (state) => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state),
  }), { },
)(Blog);
