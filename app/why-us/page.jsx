import WhyUs from 'UI/views/WhyUs';
import { getPage } from 'utils/dataFetching/getPage';
import { generatePageMicrodata, getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.whyUs.slug });

export default async function Page() {
  const { data } = await getPage(routes.whyUs.slug);

  const { microdata, breadcrumbs } = generatePageMicrodata(routes.whyUs.slug);

  return (
    <WhyUs
      data={data}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </WhyUs>
  );
}
