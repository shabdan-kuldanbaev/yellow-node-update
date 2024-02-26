import WorksView from 'UI/views/Works';
import { BLOCKS_SLUGS, DEFAULT_WORKS_LIMIT } from 'utils/constants';
import { getPage } from 'utils/dataFetching/getPage';
import { getWorkTagsAndTypes } from 'utils/dataFetching/getWorkTagsAndTypes';
import { findBlock, getDocumentFields, rootUrl } from 'utils/helper';
import { routes } from 'utils/routes';

export default async function Page() {
  const { data } = await getPage(routes.portfolio.slug);

  const {
    data: {
      types = [],
      tags = [],
    },
  } = await getWorkTagsAndTypes();

  const { pageTitle: title, subtitle } = data;

  const portfolioProjects = findBlock(data.contentModules, BLOCKS_SLUGS.worksPagePreviewProjects);
  const { contentModules } = getDocumentFields(portfolioProjects, ['contentModules']);
  const works = contentModules.map((module) => {
    const {
      types: workTypes = [],
      tags: workTags = [],
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
      types: workTypes.map((type) => getDocumentFields(type, ['slug', 'displayName'])) ?? [],
      tags: workTags.map((tag) => getDocumentFields(tag, ['slug', 'title'])) ?? [],
      ...rest,
    };
  });

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
      title={title}
      subtitle={subtitle}
      types={types}
      tags={tags}
    />
  );
}
