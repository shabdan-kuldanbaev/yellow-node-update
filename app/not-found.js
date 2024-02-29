import PageNotFound from 'containers/PageNotFound';
import { getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.notFound.slug });

export default async function Page() {
  return <PageNotFound />;
}
