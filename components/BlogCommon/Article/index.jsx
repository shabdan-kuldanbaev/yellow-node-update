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
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Article = ({
  introSection,
  article,
  isLoading,
  maxScrollPosition,
}) => {
  const articleBodyRef = useRef(null);
  const maxPosition = useRef(0);
  const document = get(article, 'items[0]', {});
  const {
    slug,
    oldBody,
    title,
    introduction,
    headImageUrl,
  } = getDocumentFields(document, [
    'slug',
    'oldBody',
    'title',
    'introduction',
    'headImageUrl',
  ]);
  const headImage = getFileUrl(headImageUrl);

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
            <div>
              <h1 className={styles.h1}>{title}</h1>
            </div>
            <div>
              <p>{introduction}</p>
            </div>
          </div>
        </header>
        <div className={styles.body} ref={articleBodyRef}>
          {oldBody ? <OldArticle oldBody={oldBody} /> : <ContentfulParser document={document} />}
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
