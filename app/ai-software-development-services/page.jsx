import { notFound } from 'next/navigation';
import CustomServiceContainer from 'containers/CustomService';
import { getPage } from 'utils/dataFetching/getPage';
import { generatePageMicrodata, getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.aiSoftwareDevelopmentServices.slug });

export default async function Page() {
  const { slug } = routes.aiSoftwareDevelopmentServices;
  const { data } = await getPage(slug);

  if (!data) {
    notFound();
  }

  const { ...restData } = data;

  const { microdata, breadcrumbs } = generatePageMicrodata(slug);

  return (
    <CustomServiceContainer
      type={slug}
      data={restData}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </CustomServiceContainer>
  );
}
