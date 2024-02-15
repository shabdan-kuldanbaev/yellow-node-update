import { useContext } from 'react';
import CustomServiceContainer from 'containers/CustomService';
import { PageFetchContext } from 'utils/appContext';
import {
  aboutRoutes,
  regionalDevelopmentRoutes,
  serviceDevelopmentRoutes,
} from 'utils/routes';

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

export default function Page({ params }) {
  const { 'service-slug': slug } = params;

  const { setPageFetchQuery } = useContext(PageFetchContext);
  setPageFetchQuery(slug);

  return <CustomServiceContainer type={slug} />;
}
