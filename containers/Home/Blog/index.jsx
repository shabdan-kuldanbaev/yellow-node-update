import React, { useEffect, useState } from 'react';
import {
  SectionTitle,
  ButtonMore,
  Articles,
} from 'components';
import { loadArticles } from 'redux/actions/blog';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { mobileResolution } from 'utils/helper';
import styles from './styles.module.scss';

const Blog = ({
  isLoading,
  articles,
  loadArticles: loadPartOfArticles,
}) => {
  const { asPath } = useRouter();
  const [isMobileResolution, setMobileResolution] = useState(false);
  const currentPage = 1;

  useEffect(() => {
    const setResize = () => (window.innerWidth < mobileResolution ? setMobileResolution(true) : setMobileResolution(false));
    setResize();
    window.addEventListener('resize', setResize);
    return () => {
      window.removeEventListener('resize', setResize);
    };
  }, [isMobileResolution]);

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
        isMobileResolution={isMobileResolution}
        asPath={asPath}
        currentPage={currentPage}
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
