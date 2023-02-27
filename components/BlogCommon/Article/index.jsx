import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import OldArticle from 'components/BlogCommon/Article/OldArticle';
import withScroll from 'hocs/withScroll';
import gaHelper from 'utils/ga';
import { formatDate } from 'utils/helper';
import FullScreenEstimation, { FullscreenEstimationContext } from 'components/Common/FullScreenEstimation';
import { Author } from './Author';
import { NavigationByTitles } from './NavigationByTitles';
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

  const [isFullscreenEstimationOpen, setFullscreenEstimationOpen] = useState(false);

  useEffect(() => () => {
    if (slug) {
      gaHelper.trackEvent(
        'Scroll',
        `${maxScrollPosition.current}%`,
        `/blog/${slug}`,
        maxScrollPosition.current < 50,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const context = useMemo(() => ({
    isShown: isFullscreenEstimationOpen,
    open: () => setFullscreenEstimationOpen(true),
  }), [isFullscreenEstimationOpen]);

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
          <p className={styles.date}>
            {formatDate(publishedAt)}
          </p>
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
        <NavigationByTitles
          articleBodyRef={articleBodyRef}
          articleSlug={slug}
        />

        <FullscreenEstimationContext.Provider value={context}>
          {oldBody
            ? <OldArticle oldBody={oldBody} />
            : <ContentfulParser document={body} />}

        </FullscreenEstimationContext.Provider>

        <FullScreenEstimation
          isFullscreenEstimation={isFullscreenEstimationOpen}
          closeFullscreenEstimation={() => setFullscreenEstimationOpen(false)}
        />
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
  publishedAt: '',
};

Article.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  maxScrollPosition: PropTypes.instanceOf(Object).isRequired,
  slug: PropTypes.string,
  title: PropTypes.string,
  oldBody: PropTypes.string,
  body: PropTypes.instanceOf(Object),
  introduction: PropTypes.string,
  headImage: PropTypes.string.isRequired,
  author: PropTypes.instanceOf(Object).isRequired,
  publishedAt: PropTypes.string,
};

export default withScroll(Article);
