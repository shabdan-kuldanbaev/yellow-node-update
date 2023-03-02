import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { isMobile } from 'redux/selectors/client-side';
import { ArticlePreview } from 'components/Common/ArticlePreview';
import { ARTICLE_PREVIEW_TYPES } from 'utils/constants';
import BlogSubscribeCard from 'UI/components/Cards/BlogSubscribeCard';
import { getArticleProps } from './utils/propsHelper';
import styles from './styles.module.scss';

export const ArticlesList = ({
  articles,
  isSearch,
  isBlogPage,
  currentPage,
  handleOnCloseModalWindow,
  toggleFullscreenSubscribe,
}) => {
  const isMobileResolution = useSelector(isMobile);

  const articleType = isSearch
    ? ARTICLE_PREVIEW_TYPES.search
    : ARTICLE_PREVIEW_TYPES.blog;

  return (
    <div className={cn(styles.articlesList)}>
      {articles?.map((article, index) => {
        const articleProps = getArticleProps({
          article,
          index,
          isSearch,
          isMobileResolution,
        });

        return (
          <>
            {/* Subscribe Card at 3rd position */}
            {currentPage === 1
            && isBlogPage
            && index === 2
            && <BlogSubscribeCard toggleFullscreenSubscribe={toggleFullscreenSubscribe} />}

            <ArticlePreview
              type={articleType}
              key={articleProps.title}
              index={index}
              animatioProps={articleProps.animatioProps}
              slug={articleProps.slug}
              title={articleProps.title}
              tags={articleProps.tagsListCollection?.items}
              introduction={articleProps.introduction}
              image={articleProps.previewImage}
              date={articleProps.publishedAt}
              isSearch={isSearch}
              handleOnCloseModalWindow={handleOnCloseModalWindow}
            />
          </>
        );
      })}
    </div>
  );
};

ArticlesList.defaultProps = {
  isSearch: false,
  isBlogPage: false,
  handleOnCloseModalWindow: () => {},
};

ArticlesList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isSearch: PropTypes.bool,
  isBlogPage: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  handleOnCloseModalWindow: PropTypes.func,
  toggleFullscreenSubscribe: PropTypes.func,
};

export default ArticlesList;
