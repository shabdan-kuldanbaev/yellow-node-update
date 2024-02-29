import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getPage } from 'utils/dataFetching/getPage';
import { rootUrl } from 'utils/helper';
import { getPageMicrodata } from 'utils/microdata';

export const getPageMetadataGenerator = ({ page }) => async function generateMetadata() {
  const { data } = await getPage(page);

  if (!data) {
    return {};
  }

  const {
    metaData,
    pageTitle,
    subtitle,
  } = data;
  const {
    metaTitle,
    metaDescription,
    ogImage: imageUrl,
  } = metaData;

  const title = metaTitle || `${pageTitle} | Yellow`;
  const description = metaDescription || subtitle;

  return {
    metadataBase: new URL(rootUrl),
    title,
    description,
    alternates: {
      canonical: page,
    },
    openGraph: {
      type: 'website',
      images: [{ url: imageUrl }],
    },
  };
};

export function generatePageMicrodata(page) {
  const breadcrumbs = getBreadcrumbs(page);
  const microdata = getPageMicrodata(page, { breadcrumbs });

  return {
    breadcrumbs,
    microdata,
  };
}
