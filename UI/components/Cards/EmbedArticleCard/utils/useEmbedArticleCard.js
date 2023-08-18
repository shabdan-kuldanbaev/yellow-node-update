import { getDocumentFields, getImage } from 'utils/helper';
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

  const image = getImage(previewImageUrl);

  const url = routes.article.getRoute(slug).path;

  return {
    ...rest,
    image,
    url,
  };
}
