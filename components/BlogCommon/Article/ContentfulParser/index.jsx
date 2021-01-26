import React from 'react';
import PropTypes from 'prop-types';
import {
  BLOCKS,
  MARKS,
  INLINES,
} from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import get from 'lodash/get';
import {
  BookmarkCard,
  GalleryCard,
  Animated,
  LinkWrapper,
} from 'components';
import { animatedType } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

export const ContentfulParser = ({ document }) => {
  const options = {
    renderMark: {
      [MARKS.CODE]: (node) => <sub>{node}</sub>,
      [MARKS.BOLD]: (node) => <b>{node}</b>,
      [MARKS.ITALIC]: (node) => <i>{node}</i>,
      [MARKS.UNDERLINE]: (node) => <u>{node}</u>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const id = get(node, 'data.target.sys.contentType.sys.id', '');

        switch (id) {
        case 'bookmark': {
          const {
            title,
            slug,
            description,
            headImageUrl,
          } = getDocumentFields(
            get(node, 'data.target.fields.article', {}),
            ['title', 'slug', 'description', 'headImageUrl'],
          );
          const image = getFileUrl(headImageUrl);

          return (title && slug && description && image && (
            <BookmarkCard
              titte={title}
              slug={slug}
              description={description}
              image={image}
            />
          )
          );
        }
        case 'image': {
          const { type, image, photoCaption } = getDocumentFields(
            get(node, 'data.target', ''),
            ['type', 'image', 'photoCaption'],
          );
          const imageUrl = getFileUrl(image);

          return (type && image && (
            <div className={styles.imageWrapper}>
              <div className={type === 'normal' ? styles.normalImage : styles.fullImage}>
                <Animated type={animatedType.imageZoom}>
                  <img src={imageUrl} alt={imageUrl} />
                </Animated>
                {photoCaption && <div className={styles.photoCaption}>{photoCaption}</div>}
              </div>
            </div>
          )
          );
        }
        case 'gallery': {
          const { images, photoCaption } = getDocumentFields(
            get(node, 'data.target', {}),
            ['images', 'photoCaption'],
          );

          return images && <GalleryCard images={images} photoCaption={photoCaption} />;
        }
        default:
          return null;
        }
      },
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote className={styles.quote}>{children}</blockquote>,
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className={styles.h2}>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className={styles.h3}>{children}</h3>,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={styles.ul}>
          {children && children.map((child) => (
            <li key={child.key}>
              {child.props.children}
            </li>
          ))}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol type="1" className={styles.ol}>
          {children && children.map((child) => (
            <li key={child.key}>
              {child.props.children}
            </li>
          ))}
        </ol>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <LinkWrapper to={get(node, 'data.uri', '/')} isLocalLink>
          {children}
        </LinkWrapper>
      ),
    },
  };

  return document
    ? documentToReactComponents(document, options)
    : '';
};

ContentfulParser.propTypes = {
  document: PropTypes.instanceOf(Object).isRequired,
};
