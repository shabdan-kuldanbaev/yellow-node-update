import { useContext } from 'react';
import WorksView from 'pages/works';
import { PageFetchContext } from 'utils/appContext';
import { BLOCKS_SLUGS, DEFAULT_WORKS_LIMIT } from 'utils/constants';
import { getPage } from 'utils/dataFetching/getPage';
import { findBlock, getDocumentFields, rootUrl } from 'utils/helper';
import { routes } from 'utils/routes';

export default async function Page() {
  const { data } = await getPage(routes.portfolio.slug);

  const portfolioProjects = findBlock(data.contentModules, BLOCKS_SLUGS.worksPagePreviewProjects);
  const { contentModules } = getDocumentFields(portfolioProjects, ['contentModules']);
  const works = contentModules.map((module) => {
    const {
      types,
      tags,
      ...rest
    } = getDocumentFields(module, [
      'title',
      'description',
      'types',
      'tags',
      'previewImage',
      'backgroundImage',
      'slug',
    ]);

    return {
      types: types?.map((type) => getDocumentFields(type, ['slug', 'displayName'])) ?? [],
      tags: tags?.map((tag) => getDocumentFields(tag, ['slug', 'title'])) ?? [],
      ...rest,
    };
  });

  const { setPageFetchQuery } = useContext(PageFetchContext);
  setPageFetchQuery(routes.portfolio.slug);

  const initialWorksList = works.slice(0, DEFAULT_WORKS_LIMIT);

  const pageMetadata = {
    url: `${rootUrl}/works`,
    ...data.metaData,
  };

  const link = data.contentModules.find((module) => module?.sys?.contentType?.sys?.id === 'link');

  return (
    <WorksView
      works={works}
      initialWorksList={initialWorksList}
      link={link}
      pageMetadata={pageMetadata}
    />
  );
}
