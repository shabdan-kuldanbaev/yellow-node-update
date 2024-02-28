import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getPage } from 'utils/dataFetching/getPage';
import { rootUrl } from 'utils/helper';
import { getPageMicrodata } from 'utils/microdata';
import { routes } from 'utils/routes';

export async function generateBlogMetadata({ searchParams }) {
  const { page = 1 } = searchParams;

  const { data: { metaData } } = await getPage(routes.blog.slug);

  const {
    metaTitle,
    metaDescription,
    ogImage: imageUrl,
  } = metaData;

  const title = page > 1 ? `${metaTitle} | Page ${page}` : metaTitle;
  const description = page > 1 ? `${metaDescription} | Page ${page}` : metaDescription;
  const url = routes.blog.slug;

  return {
    metadataBase: new URL(rootUrl),
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      images: [{ url: imageUrl }],
    },
  };
}

export function generateBlogMicrodata({ category, tagsList }) {
  const breadcrumbs = getBreadcrumbs(routes.blog.slug, { slug: category, tagsList });
  const microdata = getPageMicrodata(routes.blog.slug, { breadcrumbs });

  return { microdata, breadcrumbs };
}
