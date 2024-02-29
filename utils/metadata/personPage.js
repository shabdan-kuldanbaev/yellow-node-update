import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getPerson } from 'utils/dataFetching/getPerson';
import { getDocumentFields, getFileUrl, rootUrl } from 'utils/helper';
import { getPageMicrodata } from 'utils/microdata';
import { routes } from 'utils/routes';

export async function generatePersonPageMetadata({ params }) {
  const { data } = await getPerson(params.slug);

  const {
    metaTitle,
    entryName,
    fullName,
    metaDescription,
    bio,
  } = data;

  const title = metaTitle || fullName || entryName;
  const description = metaDescription || bio;
  const url = routes.person.getRoute(params.slug).path;

  return {
    metadataBase: new URL(rootUrl),
    title,
    description,
    url,
  };
}

export async function generatePersonMicrodata(person) {
  const { data } = await getPerson(person);

  const {
    fullName,
    position,
    bio,
    avatar,
    socialLinks,
  } = data;

  const additionalMicrodata = {
    name: fullName,
    url: new URL(routes.person.getRoute(person).path, rootUrl).toString(),
    image: getFileUrl(avatar),
    jobTitle: position,
    description: bio,
    sameAs: socialLinks.map((link) => {
      const { url } = getDocumentFields(link, ['url']);

      return url;
    }),
  };

  const breadcrumbs = getBreadcrumbs(routes.person.slug, {
    slug: person,
    title: fullName,
  });

  const microdata = getPageMicrodata(routes.person.slug, { breadcrumbs, microData: additionalMicrodata });

  return { microdata, breadcrumbs };
}
