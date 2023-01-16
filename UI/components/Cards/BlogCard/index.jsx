import React from 'react';
import LinkWrapper from 'UI/components/LinkWrapper';
import { CATEGORY_TAGS } from 'utils/constants';
import { formatDate } from 'utils/helper';
import CustomImage from 'components/Common/CustomImage';
import useCardProps from './utils/useCardProps';
import styles from './styles.module.scss';

const BlogCard = (props) => {
  const {
    articlePath,
    categoryPath,
    imageUrl,
    imageSizes,
    publishedAt,
    title,
    introduction,
    categoryTag,
  } = useCardProps(props);

  return (
    <LinkWrapper
      isLocalLink
      path={articlePath}
    >
      <article className={styles.article}>
        <CustomImage
          {...imageSizes}
          src={imageUrl}
          alt={articlePath}
          layout="responsive"
          scale={2}
          containerClasses={styles.imgContainer}
        />
        <div className={styles.articleContent}>
          <span className={styles.date}>
            {formatDate(publishedAt)}
          </span>
          <h3 className={styles.title}>
            <span>
              {title}
            </span>
          </h3>
          <p className={styles.introduction}>
            {introduction}
          </p>
          <span className={styles.category}>
            {`#${CATEGORY_TAGS[categoryTag].replace(/\s/g, '')}`}
          </span>
        </div>
      </article>
    </LinkWrapper>
  );
};

export default BlogCard;
