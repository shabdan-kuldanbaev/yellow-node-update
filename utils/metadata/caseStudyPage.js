import { routes } from 'utils/routes';
import { getPageMetadataGenerator } from './page';

export async function generateCaseStudyPageMetadata({ params: { slug } }) {
  const generator = getPageMetadataGenerator({ page: slug });

  const {
    title,
    description: metaDescription,
    ...metaData
  } = await generator();

  const description = metaDescription || `Yellow professionals have created ${title}. Read our case study to find more!`;

  return {
    ...metaData,
    title,
    description,
    url: routes.portfolio.getRoute(slug).path,
  };
}
