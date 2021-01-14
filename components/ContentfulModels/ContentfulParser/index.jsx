import React from 'react';
import PropTypes from 'prop-types';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import get from 'lodash/get';
import {
  BookmarkCard,
  GalleryCard,
  Animated,
} from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const ContentfulParser = ({ document }) => {
  const options = {
    renderMark: {
      [MARKS.CODE]: (node) => <sub>{node}</sub>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const id = get(node, 'data.target.sys.contentType.sys.id', '');

        switch (id) {
        case 'bookmark': {
          const article = get(node, 'data.target', {});

          return <BookmarkCard data={article} />;
        }
        case 'image': {
          const type = get(node, 'data.target.fields.type', '');
          const imageUrl = get(node, 'data.target.fields.image.fields.file.url', {});
          const photoCaption = get(node, 'data.target.fields.photoCaption', '');

          return (
            <div className={styles.imageWrapper}>
              <div className={type === 'normal' ? styles.normalImage : styles.fullImage}>
                <Animated type={animatedType.imageZoom}>
                  <img src={imageUrl} alt={imageUrl} />
                </Animated>
                {photoCaption && <div className={styles.photoCaption}>{photoCaption}</div>}
              </div>
            </div>
          );
        }
        case 'gallery': {
          const images = get(node, 'data.target.fields', {});

          return <GalleryCard data={images} />;
        }
        default:
          return null;
        }
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={styles.paragraph}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={styles.quote}>
          {children}
        </blockquote>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={styles.h2}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3>{children}</h3>
      ),
    },
  };

  const contentfulData = get(document, 'body', null)
    ? documentToReactComponents(document && document.body, options)
    : '';

  return contentfulData;
};

ContentfulParser.propTypes = {
  document: PropTypes.instanceOf(Object).isRequired,
};
