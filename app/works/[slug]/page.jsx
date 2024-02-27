import { notFound } from 'next/navigation';
import CaseStudiesContainer from 'containers/CaseStudies';
import { CASE_STUDIES } from 'utils/constants';
import { getPage } from 'utils/dataFetching/getPage';

export async function generateStaticParams() {
  return Object.values(CASE_STUDIES);
}

export default async function Page({ params }) {
  const { slug } = params;

  const { data: pageData } = getPage(slug);

  if (!pageData) {
    notFound();
  }

  return <CaseStudiesContainer slug={slug} />;
}
