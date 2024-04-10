import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'UI/components/LinkWrapper';
import { ROUTES, VALUABLE_ARTICLE_CATEGORIES_SLUGS } from 'utils/constants';
import { formatDate } from 'utils/helper';
import CardContainer from 'UI/containers/CardContainer';
import Illustration from 'UI/components/Illustration';
import { routes } from 'utils/routes';
import styles from './styles.module.scss';

export const ArticlePreview = ({
  slug,
  title,
  image,
  tags,
  introduction = '',
  date = '',
  type,
  index = 1,
  isSearch = false,
  handleOnCloseModalWindow = () => {},
}) => {
  const { path } = ROUTES.article.getRoute(slug);
  const articleLinkProps = { path };

  if (!slug || !title || !image) {
    return null;
  }

  const handleOnArticleClick = () => {
    if (isSearch) {
      handleOnCloseModalWindow();
    }
  };

  const imageSizes = index === 0 ? {
    width: 720,
    height: 428,
  } : {
    width: 297,
    height: 223,
  };

  return (
    <article
      className={cn(styles[type], { [styles.medium]: index === 0 })}
      onClick={handleOnArticleClick}
    >
      <CardContainer className={styles.card}>
        <LinkWrapper {...articleLinkProps}>
          <Illustration
            src={image}
            alt={title}
            layout="responsive"
            {...imageSizes}
            scale={2}
            className={styles.imgContainer}
          />
        </LinkWrapper>
        <div className={styles.articleContent}>
          {date && (
            <span className={styles.date}>
              {formatDate(date)}
            </span>
          )}
          <LinkWrapper
            {...articleLinkProps}
            className={styles.articlePreviewTitle}
          >
            <h3 className={styles.title}>
              {title}
            </h3>
          </LinkWrapper>
          {introduction && (
            <LinkWrapper
              {...articleLinkProps}
              className={styles.articlePreviewIntroduction}
            >
              <p className={styles.introduction}>
                {introduction}
              </p>
            </LinkWrapper>
          )}
          {tags?.length && (
            <div className={styles.tags}>
              {(tags || [])
                .filter(({ slug: tagSlug }) => (isSearch || VALUABLE_ARTICLE_CATEGORIES_SLUGS.includes(tagSlug)))
                .map(({ slug: tagSlug }) => (
                  <LinkWrapper
                    key={`tag_key_${tagSlug}`}
                    path={routes.blog.getRoute(tagSlug).path}
                    className={styles.tag}
                  >
                    {`#${tagSlug.replaceAll('-', '')}`}
                  </LinkWrapper>
                ))}
            </div>
          )}
        </div>
      </CardContainer>
    </article>
  );
};

ArticlePreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  introduction: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number,
  isSearch: PropTypes.bool,
  handleOnCloseModalWindow: PropTypes.func,
  animatioProps: PropTypes.instanceOf(Object).isRequired,
};
