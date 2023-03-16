import { useSelector } from 'react-redux';
import { isTablet } from 'redux/selectors/layout';
import { ROUTES } from 'utils/constants';

export default (props) => {
  const {
    index,
    slug,
    categoryTag,
    previewImageUrl,
    publishedAt,
    tagsListCollection,
    ...rest
  } = props;

  const { slug: tagSlug } = tagsListCollection.items[0];

  const isTabletResolution = useSelector(isTablet);
  const { path: articlePath } = ROUTES.article.getRoute(slug);
  const { path: categoryPath } = ROUTES.blog.getRoute(categoryTag);
  const imageUrl = previewImageUrl.url;
  const hashLinks = `#${(tagSlug || '').replace('-', '')}`;

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
