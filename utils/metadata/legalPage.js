import { getPageMetadataGenerator } from './page';

export async function generateLegalPageMetadata({ params }) {
  const generator = getPageMetadataGenerator({ page: params['legal-slug'] });

  return await generator();
}
