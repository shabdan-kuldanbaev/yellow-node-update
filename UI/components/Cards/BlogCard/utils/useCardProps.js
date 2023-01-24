import { useSelector } from 'react-redux';
import { selectIsTabletResolutions } from 'redux/selectors/layout';
import { CATEGORY_TAGS, ROUTES } from 'utils/constants';

export default (props) => {
  const {
    index,
    slug,
    categoryTag,
    previewImageUrl,
    publishedAt,
    ...rest
  } = props;

  const isTabletResolution = useSelector(selectIsTabletResolutions);
  const { path: articlePath } = ROUTES.article.getRoute(slug);
  const { path: categoryPath } = ROUTES.blog.getRoute(categoryTag);
  const imageUrl = previewImageUrl.url;
  const hashLinks = `#${CATEGORY_TAGS[categoryTag].replace(/\s/g, '')}`;

  return {
    articlePath,
    categoryPath,
    imageUrl,
    hashLinks,
    publishedAt,
    index,
    isTabletResolution,
    ...rest,
  };
};
