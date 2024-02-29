import CompanyContainer from 'containers/Company';
import { getPage } from 'utils/dataFetching/getPage';
import { generatePageMicrodata, getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.company.slug });

export default async function Page() {
  const { data = {} } = await getPage(routes.company.slug);

  const { microdata, breadcrumbs } = generatePageMicrodata(routes.company.slug);

  return (
    <CompanyContainer
      data={data}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </CompanyContainer>
  );
}
