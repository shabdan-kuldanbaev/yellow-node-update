import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import {
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
  maxScrollPosition,
}) => {
  const articleBodyRef = useRef(null);
  const maxPosition = useRef(0);

  useEffect(() => () => {
    if (slug) {
      ReactGA.event({
        category: 'Scroll',
        action: `${maxPosition.current}%`,
        label: `/blog/${slug}`,
        nonInteraction: maxPosition.current < 50,
      });
    }
  }, [slug]);

  useEffect(() => {
    maxPosition.current = maxScrollPosition;
  }, [maxScrollPosition]);

  return (
    <section ref={introSection} className={styles.article}>
      <header className={styles.header}>
        <div style={{ backgroundImage: `url(${headImage})` }} />
        <div className={styles.container}>
          <h1 className={styles.h1}>{title}</h1>
          <p>{introduction}</p>
        </div>
      </header>
      <div className={styles.body} ref={articleBodyRef}>
        {oldBody ? <OldArticle oldBody={oldBody} /> : <ContentfulParser document={body} />}
      </div>
    </section>
  );
};

Article.defaultProps = {
  oldBody: '',
  body: null,
  slug: '',
  title: '',
  introduction: '',
};

Article.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  maxScrollPosition: PropTypes.number.isRequired,
  slug: PropTypes.string,
  title: PropTypes.string,
  oldBody: PropTypes.string,
  body: PropTypes.instanceOf(Object),
  introduction: PropTypes.string,
  headImage: PropTypes.string.isRequired,
};

export default withScroll(Article);
