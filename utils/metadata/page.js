import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getPage } from 'utils/dataFetching/getPage';
import { rootUrl } from 'utils/helper';
import { getPageMicrodata } from 'utils/microdata';

const robotsRules = {
  none: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

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
    metaRobots,
  } = metaData;

  const title = metaTitle || `${pageTitle} | Yellow`;
  const description = metaDescription || subtitle;

  const robots = robotsRules[metaRobots];

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
      url: page,
    },
    robots,
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
