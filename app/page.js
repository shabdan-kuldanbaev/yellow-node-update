import Home from 'containers/Home';
import { HOMEPAGE_ARTICLES_LIMIT } from 'utils/constants';
import { getArticlesList } from 'utils/dataFetching/getArticlesList';
import { getPage } from 'utils/dataFetching/getPage';
import { generatePageMicrodata, getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.homepage.slug });

export default async function Page() {
  const { data: { contentModules } } = await getPage(routes.homepage.slug);

  const { data: { items: articles = [] } } = await getArticlesList({ limit: HOMEPAGE_ARTICLES_LIMIT });

  const { microdata } = generatePageMicrodata(routes.homepage.slug);

  return (
    <Home
      contentModules={contentModules}
      articles={articles}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </Home>
  );
}
