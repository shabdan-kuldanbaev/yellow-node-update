import dynamic from 'next/dynamic';
import {
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import withScroll from 'hocs/withScroll';
import gaHelper from 'utils/ga';
import { formatDate } from 'utils/helper';
import FullScreenEstimation, { FullscreenEstimationContext } from 'components/Common/FullScreenEstimation';
import Illustration from 'UI/components/Illustration';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { Author } from './Author';
import { NavigationByTitles } from './NavigationByTitles';
import styles from './styles.module.scss';

const OldArticle = dynamic(() => import('components/BlogCommon/Article/OldArticle'));

const Article = ({
  introSection,
  author,
  headImage,
  maxScrollPosition,
  body = null,
  slug = '',
  title = '',
  oldBody = '',
  introduction = '',
  publishedAt = '',
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
        <Illustration
          src={headImage.url}
          alt={headImage.alt}
          className={styles.headImage}
          priority
        />
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

Article.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  maxScrollPosition: PropTypes.instanceOf(Object).isRequired,
  slug: PropTypes.string,
  title: PropTypes.string,
  oldBody: PropTypes.string,
  body: PropTypes.instanceOf(Object),
  introduction: PropTypes.string,
  headImage: PropTypes.instanceOf(Object).isRequired,
  author: PropTypes.instanceOf(Object).isRequired,
  publishedAt: PropTypes.string,
};

export default withScroll(Article);
