import ProcessContainer from 'UI/views/Process';
import { generatePageMicrodata, getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.process.slug });

export default async function Page() {
  const { microdata, breadcrumbs } = generatePageMicrodata(routes.process.slug);

  return (
    <ProcessContainer breadcrumbs={breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </ProcessContainer>
  );
}
