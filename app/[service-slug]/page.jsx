import { notFound } from 'next/navigation';
import CustomServiceContainer from 'containers/CustomService';
import {
  aboutRoutes,
  regionalDevelopmentRoutes,
  serviceDevelopmentRoutes,
} from 'utils/routes';
import { getPage } from 'utils/dataFetching/getPage';
import { generatePageMicrodata } from 'utils/metadata/page';

export { generateServicePageMetadata as generateMetadata } from 'utils/metadata/servicePage';

const excludedRoutes = [
  serviceDevelopmentRoutes.aiSoftwareDevelopmentServices,
];

export async function generateStaticParams() {
  const routes = [
    ...Object.values(serviceDevelopmentRoutes),
    ...Object.values(regionalDevelopmentRoutes),
    aboutRoutes.bookCall,
    aboutRoutes.deliveryQualityInYellow,
    aboutRoutes.softwareDevelopmentPrice,
  ].filter((route) => !excludedRoutes.includes(route));

  return routes.map((route) => ({
    'service-slug': route.slug,
  }));
}

export default async function Page({ params }) {
  const { 'service-slug': slug } = params;

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
