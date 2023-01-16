import React from 'react';
import LinkWrapper from 'UI/components/LinkWrapper';
import Illustration from 'UI/components/Illustration';
import { formatDate } from 'utils/helper';
import useCardProps from './utils/useCardProps';
import styles from './styles.module.scss';

const BlogCard = (props) => {
  const {
    index,
    articlePath,
    categoryPath,
    imageUrl,
    imageSizes,
    publishedAt,
    title,
    introduction,
    hashLinks,
    isTabletResolution,
  } = useCardProps(props);

  return (
    <LinkWrapper
      isLocalLink
      path={articlePath}
    >
      <article className={styles.article}>
        <Illustration
          {...imageSizes}
          src={imageUrl}
          className={styles.imgContainer}
          objectFit="cover"
          layout="fill"
          transparent
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
          {(index !== 0 && !isTabletResolution) && (
            <p className={styles.introduction}>
              {introduction}
            </p>
          )}
          <LinkWrapper
            isLocalLink
            path={categoryPath}
            className={styles.categoryLink}
          >
            <span className={styles.category}>
              {hashLinks}
            </span>
          </LinkWrapper>
        </div>
      </article>
    </LinkWrapper>
  );
};

export default BlogCard;
