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
}
