import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import {
  Loader,
  ContentfulParser,
  OldArticle,
  withScroll,
} from 'components';
import styles from './styles.module.scss';

const Article = ({
  introSection,
  slug,
  title,
  oldBody,
  body,
  introduction,
  headImage,
  isLoading,
  maxScrollPosition,
}) => {
  const articleBodyRef = useRef(null);
  const maxPosition = useRef(0);

  useEffect(() => () => ReactGA.event({
    category: 'Scroll',
    action: `${maxPosition.current}%`,
    label: `/blog/${slug}`,
    nonInteraction: maxPosition.current < 50,
  }), [slug]);

  useEffect(() => {
    maxPosition.current = maxScrollPosition;
  }, [maxScrollPosition]);

  return (
    <Loader isLoading={!isLoading}>
      <section ref={introSection} className={styles.article}>
        <header className={styles.header}>
          <div>
            <div style={{ backgroundImage: `url(${headImage})` }} />
          </div>
          <div className={styles.container}>
            <h1 className={styles.h1}>{title}</h1>
            <p>{introduction}</p>
          </div>
        </header>
        <div className={styles.body} ref={articleBodyRef}>
          {oldBody ? <OldArticle oldBody={oldBody} /> : <ContentfulParser document={body} />}
        </div>
      </section>
    </Loader>
  );
};

Article.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  maxScrollPosition: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  oldBody: PropTypes.string.isRequired,
  body: PropTypes.instanceOf(Object).isRequired,
  introduction: PropTypes.string.isRequired,
  headImage: PropTypes.string.isRequired,
};

export default withScroll(Article);
