import TechnicalPageContainer from 'UI/views/TechnicalPage';
import { legalInfoRoutes } from 'utils/routes';

export async function generateStaticParams() {
  return legalInfoRoutes.map((route) => ({
    'legal-slug': route.slug,
  }));
}

export default function Page({ params }) {
  const { 'legal-slug': slug } = params;

  const { title } = Object.values(legalInfoRoutes).find((route) => route.slug === slug);

  return (
    <TechnicalPageContainer
      type={slug}
      title={title}
    />
  );
}
