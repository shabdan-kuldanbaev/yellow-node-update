import { notFound } from 'next/navigation';
import PersonContainer from 'UI/views/Person';
import { ARTICLES_NUMBER_PER_PAGE } from 'utils/constants';
import { getPerson } from 'utils/dataFetching/getPerson';
import { getPersonRelatedArticles } from 'utils/dataFetching/getPersonRelatedArticles';
import { generatePersonMicrodata } from 'utils/metadata/personPage';

export { generatePersonPageMetadata as generateMetadata } from 'utils/metadata/personPage';

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

  const { microdata, breadcrumbs } = await generatePersonMicrodata(slug);

  return (
    <PersonContainer
      person={person}
      articlesData={articlesData}
      currentPage={page}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </PersonContainer>
  );
}
