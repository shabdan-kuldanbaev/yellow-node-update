import WorksView from 'UI/views/Works';
import { BLOCKS_SLUGS, DEFAULT_WORKS_LIMIT } from 'utils/constants';
import { getPage } from 'utils/dataFetching/getPage';
import { getWorkTagsAndTypes } from 'utils/dataFetching/getWorkTagsAndTypes';
import { findBlock, getDocumentFields } from 'utils/helper';
import { generatePageMicrodata, getPageMetadataGenerator } from 'utils/metadata/page';
import { routes } from 'utils/routes';

export const generateMetadata = getPageMetadataGenerator({ page: routes.portfolio.slug });

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
      types: workTypes,
      tags: workTags,
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
      types: (workTypes || []).map((type) => getDocumentFields(type, ['slug', 'displayName'])) ?? [],
      tags: (workTags || []).map((tag) => getDocumentFields(tag, ['slug', 'title'])) ?? [],
      ...rest,
    };
  });

  const initialWorksList = works.slice(0, DEFAULT_WORKS_LIMIT);

  const link = data.contentModules.find((module) => module?.sys?.contentType?.sys?.id === 'link');

  const { microdata, breadcrumbs } = generatePageMicrodata(routes.portfolio.slug);

  return (
    <WorksView
      works={works}
      initialWorksList={initialWorksList}
      link={link}
      title={title}
      subtitle={subtitle}
      types={types}
      tags={tags}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </WorksView>
  );
}
