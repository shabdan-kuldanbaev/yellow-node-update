import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import get from 'lodash/get';
import {
  Loader,
  ContentfulParser,
  OldArticle,
  withScroll,
} from 'components';
import styles from './styles.module.scss';

const Article = ({
  introSection,
  article,
  isLoading,
  maxScrollPosition,
}) => {
  const articleBodyRef = useRef(null);
  const maxPosition = useRef(0);
  const document = get(article, 'items[0].fields', {});
  const slug = get(article, 'items[0].fields.slug', '');

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
            <div style={{ backgroundImage: `url(${get(document, 'previewImageUrl.fields.file.url', '')})` }} />
          </div>
          <div className={styles.container}>
            <div>
              <h1 className={styles.h1}>{get(document, 'title', '')}</h1>
            </div>
            <div>
              <p>{get(document, 'introduction', '')}</p>
            </div>
          </div>
        </header>
        <div className={styles.body} ref={articleBodyRef}>
          {document.oldBody ? <OldArticle document={document} /> : <ContentfulParser document={document} />}
        </div>
      </section>
    </Loader>
  );
};

Article.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  article: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  maxScrollPosition: PropTypes.number.isRequired,
};

export default withScroll(Article);
