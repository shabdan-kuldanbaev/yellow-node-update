import { getDocumentFields, getFileUrl } from 'utils/helper';
import { routes } from 'utils/routes';

export default function useEmbedArticleCard({ data }) {
  const {
    previewImageUrl,
    slug,
    ...rest
  } = getDocumentFields(data, [
    'title',
    'description',
    'slug',
    'previewImageUrl']);

  const imageUrl = getFileUrl(previewImageUrl);

  const url = routes.article.getRoute(slug).path;

  return {
    ...rest,
    imageUrl,
    url,
  };
}
