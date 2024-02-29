import ContactUs from 'UI/views/ContactUs';
import { getPage } from 'utils/dataFetching/getPage';
import { generatePageMicrodata, getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.contact.slug });

export default async function Page() {
  const { data } = await getPage(routes.contact.slug);

  const { microdata, breadcrumbs } = generatePageMicrodata(routes.contact.slug);

  return (
    <ContactUs
      data={data}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </ContactUs>
  );
}
