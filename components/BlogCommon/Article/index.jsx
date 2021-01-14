import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Loader, ContentfulParser } from 'components';
import styles from './styles.module.scss';

const Article = ({
  introSection,
  article,
  isLoading,
}) => {
  const articleBodyRef = useRef(null);
  const document = get(article, 'items[0].fields', {});

  const createMarkup = (data) => ({ __html: data });

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
          {document.oldBody ? (
            <div className={styles.articleContentContainer}>
              <div className={styles.articleContent}>
                <div dangerouslySetInnerHTML={createMarkup(document.oldBody)} />
              </div>
            </div>
          ) : (<ContentfulParser document={document} />)}
        </div>
      </section>
    </Loader>
  );
};

Article.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  article: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Article;
