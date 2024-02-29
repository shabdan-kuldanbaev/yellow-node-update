import { getPageMetadataGenerator } from './page';

export async function generateServicePageMetadata({ params }) {
  const generator = getPageMetadataGenerator({ page: params['service-slug'] });

  return await generator();
}
