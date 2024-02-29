import { notFound } from 'next/navigation';
import TechnicalPageContainer from 'UI/views/TechnicalPage';
import { getPage } from 'utils/dataFetching/getPage';
import { generatePageMicrodata } from 'utils/metadata/page';
import { legalInfoRoutes } from 'utils/routes';

export { generateLegalPageMetadata as generateMetadata } from 'utils/metadata/legalPage';

export async function generateStaticParams() {
  return Object.values(legalInfoRoutes).map((route) => ({
    'legal-slug': route.slug,
  }));
}

export default async function Page({ params }) {
  const { 'legal-slug': slug } = params;

  const { data } = await getPage(slug);

  if (!data) {
    notFound();
  }

  const { breadcrumbs, microdata } = generatePageMicrodata(slug);

  return (
    <TechnicalPageContainer
      data={data}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </TechnicalPageContainer>
  );
}
