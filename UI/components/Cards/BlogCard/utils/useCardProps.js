import { useSelector } from 'react-redux';
import { selectIsFullResolutions } from 'redux/selectors/layout';
import { ROUTES } from 'utils/constants';

export default (props) => {
  const {
    type = 'blog',
    index,
    slug,
    categoryTag,
    previewImageUrl,
    publishedAt,
    ...rest
  } = props;

  const isFullResolution = useSelector(selectIsFullResolutions);
  const { path: articlePath } = ROUTES.article.getRoute(slug);
  const { path: categoryPath } = ROUTES.blog.getRoute(categoryTag);
  const imageUrl = previewImageUrl.url;
  const imageSizes = (isFullResolution && index === 0) ? {
    width: 584,
    height: 400,
  } : {
    width: 276,
    height: 260,
  };

  return {
    articlePath,
    categoryPath,
    imageUrl,
    imageSizes,
    categoryTag,
    publishedAt,
    index,
    ...rest,
  };
};
