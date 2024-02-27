import { notFound } from 'next/navigation';
import TechnicalPageContainer from 'UI/views/TechnicalPage';
import { getPage } from 'utils/dataFetching/getPage';
import { legalInfoRoutes } from 'utils/routes';

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

  return (
    <TechnicalPageContainer
      type={slug}
      data={data}
    />
  );
}
