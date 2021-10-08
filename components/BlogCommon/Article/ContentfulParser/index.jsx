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
  GalleryCard,
  Animated,
  LinkWrapper,
} from 'components';
import { Table } from 'components/Common/Table';
import { ANIMATED_TYPE } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  rootUrl,
} from 'utils/helper';
import { ArticleLink } from './ArticleLink';
import styles from './styles.module.scss';

// TODO move it to the common folder
export const ContentfulParser = ({ document }) => {
  const options = {
    renderMark: {
      [MARKS.CODE]: (node) => <sub>{node}</sub>,
      [MARKS.BOLD]: (node) => <b>{node}</b>,
      [MARKS.ITALIC]: (node) => <i>{node}</i>,
      [MARKS.UNDERLINE]: (node) => <u>{node}</u>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const id = get(node, 'data.target.sys.contentType.sys.id', '');

        switch (id) {
        case 'image': {
          const { articleSingleImageType, image, title } = getDocumentFields(
            get(node, 'data.target', ''),
            ['articleSingleImageType', 'image', 'title'],
          );
          const imageUrl = getFileUrl(image);

          return articleSingleImageType && imageUrl && (
            <div className={styles.imageWrapper}>
              <div className={articleSingleImageType === 'normal'
                ? styles.normalImage
                : styles.fullImage}
              >
                <Animated type={ANIMATED_TYPE.imageZoom}>
                  <img
                    src={imageUrl}
                    alt={imageUrl}
                  />
                </Animated>
                {title && (
                  <div className={styles.photoCaption}>
                    {title}
                  </div>
                )}
              </div>
            </div>
          );
        }
        case 'articleGalleryCard': {
          const { images, photoCaption } = getDocumentFields(
            get(node, 'data.target', {}),
            ['images', 'photoCaption'],
          );

          return images && (
            <GalleryCard
              images={images}
              photoCaption={photoCaption}
            />
          );
        }
        case 'link': {
          const {
            title,
            buttonTitle,
            slug,
            type,
          } = getDocumentFields(
            get(node, 'data.target', {}),
            ['title', 'buttonTitle', 'slug', 'type'],
          );

          return (
            <ArticleLink
              title={title}
              buttonTitle={buttonTitle}
              slug={slug}
              type={type}
            />
          );
        }
        case 'table': {
          const { tableContent, tableType } = getDocumentFields(
            get(node, 'data.target', {}),
            ['tableContent', 'tableType'],
          );

          return tableContent
            ? (
              <Table
                tableData={tableContent.tableData}
                type={tableType}
              />
            )
            : null;
        }
        default:
          return null;
        }
      },
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={styles.quote}>
          {children}
        </blockquote>
      ),
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={styles.h2}>
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={styles.h3}>
          {children}
        </h3>
      ),
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
        <ol
          type="1"
          className={styles.ol}
        >
          {children && children.map((child) => (
            <li key={child.key}>
              {child.props.children}
            </li>
          ))}
        </ol>
      ),
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = get(node, 'data.uri', '/');
        const isInternalLink = uri.includes(rootUrl);

        return (
          <LinkWrapper
            path={uri}
            className={styles.a}
            isLocalLink={isInternalLink}
          >
            {children}
          </LinkWrapper>
        );
      },
    },
  };

  return document
    ? documentToReactComponents(document, options)
    : '';
};

ContentfulParser.defaultProps = {
  document: null,
};

ContentfulParser.propTypes = {
  document: PropTypes.instanceOf(Object),
};
