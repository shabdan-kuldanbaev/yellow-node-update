import dynamic from 'next/dynamic';
import MetaTags from 'components/Common/MetaTags';
import Breadcrumbs from 'UI/components/Breadcrumbs';
import { useFetchPersonQuery } from 'store/apis/person';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';
import { getDocumentFields, getFileUrl, rootUrl } from 'utils/helper';
import { routes } from 'utils/routes';
import { getPersonRelatedArticles } from 'utils/dataFetching/getPersonRelatedArticles';
import styles from './styles.module.scss';

const PersonIntro = dynamic(() => import('UI/sections/PersonIntro'));
const PersonBlog = dynamic(() => import('UI/sections/Blog/PersonBlog'));
const FeedbackSection = dynamic(() => import('UI/sections/FeedbackSection'));

const PersonContainer = ({
  currentPage,
  articlesNumberPerPage,
  introSection,
  query,
}) => {
  const { data: person = {} } = useFetchPersonQuery(query.slug);
  const { data: articlesData } = getPersonRelatedArticles(query);

  const {
    fullName,
    metaTitle,
    metaDescription,
    position,
    socialLinks,
    bio,
  } = person;

  const personMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}${routes.person.getRoute(query?.slug).path}`,
    pageNumber: currentPage,
  };

  const breadcrumbs = getBreadcrumbs(PAGES.person, {
    slug: query?.slug,
    title: fullName,
  });

  const additionalMicrodata = {
    name: fullName,
    url: `${rootUrl}${routes.person.getRoute(query?.slug).path}`,
    image: getFileUrl(person?.avatar),
    sameAs: socialLinks.map((link) => {
      const { url } = getDocumentFields(link, ['url']);

      return url;
    }),
    jobTitle: position,
    description: bio,
  };

  return (
    <>
      <MetaTags
        page={PAGES.person}
        pageMetadata={personMetadata}
        breadcrumbs={breadcrumbs}
        microData={additionalMicrodata}
      />
      <main className={styles.pageMain}>
        <div className={styles.container}>
          <Breadcrumbs
            breadcrumbs={breadcrumbs}
            dark
          />
        </div>
        <PersonIntro
          introSection={introSection}
          {...person}
        />
        <PersonBlog
          title="Latest blog posts"
          articlesNumberPerPage={articlesNumberPerPage}
          currentPage={currentPage}
          {...articlesData}
        />
        <FeedbackSection
          budget
          type="person"
          section={{
            fields: {
              budget: true,
              title: 'Do you want to create a top-notch software solution? Yellow is here to help!',
              buttonTitle: 'Request a quote',
            },
          }}
        />
      </main>
    </>
  );
};

export default PersonContainer;
