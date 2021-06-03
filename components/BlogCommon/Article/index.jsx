import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ContentfulParser,
  OldArticle,
  withScroll,
  Author,
} from 'components';
import gaHelper from 'utils/ga';
import { getFormattedDate } from 'utils/helper';
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
  author,
  publishedAt,
}) => {
  const articleBodyRef = useRef(null);
  const maxPosition = useRef(0);

  useEffect(() => () => {
    if (slug) {
      gaHelper.trackEvent(
        'Scroll',
        `${maxPosition.current}%`,
        `/blog/${slug}`,
        maxPosition.current < 50,
      );
    }
  }, [slug]);

  useEffect(() => {
    maxPosition.current = maxScrollPosition;
  }, [maxScrollPosition]);

  return (
    <section
      ref={introSection}
      className={styles.article}
    >
      <header className={styles.header}>
        <div className={styles.imageWrapper}>
          <div style={{ backgroundImage: `url(${headImage})` }} />
        </div>
        <div className={styles.container}>
          <p className={styles.date}>{getFormattedDate(publishedAt, 'DD MMMM, YYYY')}</p>
          <h1 className={styles.h1}>
            {title}
          </h1>
          <p>{introduction}</p>
          <Author author={author} />
        </div>
      </header>
      <div
        className={styles.body}
        ref={articleBodyRef}
      >
        {oldBody
          ? <OldArticle oldBody={oldBody} />
          : <ContentfulParser document={body} />}
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
  author: PropTypes.instanceOf(Object).isRequired,
  publishedAt: PropTypes.string.isRequired,
};

export default withScroll(Article);
