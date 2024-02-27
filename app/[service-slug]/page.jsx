import { notFound } from 'next/navigation';
import CustomServiceContainer from 'containers/CustomService';
import {
  aboutRoutes,
  regionalDevelopmentRoutes,
  serviceDevelopmentRoutes,
} from 'utils/routes';
import { getPage } from 'utils/dataFetching/getPage';

export async function generateStaticParams() {
  const routes = [
    ...Object.values(serviceDevelopmentRoutes),
    ...Object.values(regionalDevelopmentRoutes),
    aboutRoutes.bookCall,
    aboutRoutes.deliveryQualityInYellow,
    aboutRoutes.softwareDevelopmentPrice,
  ];

  return routes.map((route) => ({
    'service-slug': route.slug,
  }));
}

export default async function Page({ params }) {
  const { 'service-slug': slug } = params;

  const x = await getPage(slug);

  const { data } = x;

  if (!data) {
    notFound();
  }

  const { metaData, ...restData } = data;

  return (
    <CustomServiceContainer
      type={slug}
      data={restData}
      metaData={metaData}
    />
  );
}
