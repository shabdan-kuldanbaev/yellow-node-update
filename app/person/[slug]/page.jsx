import { notFound } from 'next/navigation';
import PersonContainer from 'UI/views/Person';
import { ARTICLES_NUMBER_PER_PAGE } from 'utils/constants';
import { getPerson } from 'utils/dataFetching/getPerson';
import { getPersonRelatedArticles } from 'utils/dataFetching/getPersonRelatedArticles';

export default async function Page({ params, searchParams }) {
  const { slug } = params;
  const { page = 1 } = searchParams;

  const { data: person } = await getPerson(slug);

  if (!person) {
    notFound();
  }

  const query = {
    id: person.id,
    skip: ((page === 1) ? 0 : (page - 1) * ARTICLES_NUMBER_PER_PAGE - 1),
    limit: ARTICLES_NUMBER_PER_PAGE,
  };

  const { data: articlesData } = await getPersonRelatedArticles(query);
  console.log('🚀 ~ Page ~ articlesData:', articlesData);

  return (
    <PersonContainer
      slug={slug}
      articlesData={articlesData}
      currentPage={page}
      person={person}
    />
  );
}
