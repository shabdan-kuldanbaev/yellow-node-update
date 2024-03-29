import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  BLOCKS,
  MARKS,
  INLINES,
} from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import dynamic from 'next/dynamic';
import get from 'lodash/get';
import LinkWrapper from 'UI/components/LinkWrapper';
import { ANIMATED_TYPE } from 'utils/constants';
import {
  getDocumentFields,
  getImage,
  rootUrl,
} from 'utils/helper';
import Media from 'UI/components/Media';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const GalleryCard = dynamic(() => import('components/BlogCommon/Article/GalleryCard'));
const ArticleLink = dynamic(() => import('./ArticleLink').then((module) => module.ArticleLink));
const Table = dynamic(() => import('components/Common/Table'));
const EmbedArticleCard = dynamic(() => import('UI/components/Cards/EmbedArticleCard'));
const Illustration = dynamic(() => import('UI/components/Illustration'));

// TODO move it to the common folder
// TODO create constants for cases
const ContentfulParser = ({ document = null }) => {
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
          const { articleSingleImageType, image: rawImage, title } = getDocumentFields(
            get(node, 'data.target', ''),
            ['articleSingleImageType', 'image', 'title'],
          );
          const image = getImage(rawImage);

          return articleSingleImageType && image.url && (
            <div className={styles.imageWrapper}>
              <div className={cn({
                [styles.normalImage]: articleSingleImageType === 'normal',
                [styles.fullImage]: articleSingleImageType !== 'normal',
              })}
              >
                <Animated type={ANIMATED_TYPE.imageZoom}>
                  <Illustration
                    src={image.url}
                    alt={image.alt}
                    className={styles.image}
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
          const data = get(node, 'data.target', {});

          const {
            title,
            buttonTitle,
            slug,
            type,
            url,
            new: isNew,
          } = getDocumentFields(data, [
            'title',
            'buttonTitle',
            'slug',
            'type',
            'url',
            'new',
          ]);

          return (
            <ArticleLink
              data={data}
              new={isNew}
              title={title}
              buttonTitle={buttonTitle}
              slug={slug}
              type={type}
              url={url}
              className={styles.videoSection}
            />
          );
        }
        case 'table': {
          const { tableContent, tableType } = getDocumentFields(
            get(node, 'data.target', {}),
            ['tableContent', 'tableType'],
          );

          return tableContent && (
            <Table
              tableData={tableContent.tableData}
              type={tableType}
            />
          );
        }
        case 'article': {
          const data = get(node, 'data.target', {});

          return <EmbedArticleCard data={data} />;
        }
        case 'text': {
          const data = get(node, 'data.target', {});
          const {
            text,
            id: entryId,
          } = getDocumentFields(
            data,
            ['text', 'id'],
          );

          return (
            // eslint-disable-next-line react/no-unknown-property
            <div grid-area={entryId}>
              <ContentfulParser document={text} />
            </div>
          );
        }
        default:
          return null;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const data = get(node, 'data.target', {});

        return (
          // eslint-disable-next-line react/no-unknown-property
          <div grid-area="asset">
            <Media asset={data} />
          </div>
        );
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
          {children?.map((child) => (
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
          {children?.map((child) => (
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

ContentfulParser.propTypes = {
  document: PropTypes.instanceOf(Object),
};

export default ContentfulParser;
