import React from 'react';
import dynamic from 'next/dynamic';
import MetaTags from 'components/Common/MetaTags';
import Breadcrumbs from 'UI/components/Breadcrumbs';
import { useGetArticlesRelatedToPersonQuery } from 'redux/apis/blog';
import { useFetchPersonQuery } from 'redux/apis/person';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { routes } from 'utils/routes';
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
  const { data: articlesData } = useGetArticlesRelatedToPersonQuery(query);

  const {
    fullName,
    metaTitle,
    metaDescription,
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

  return (
    <>
      <MetaTags
        page={PAGES.portfolio}
        pageMetadata={personMetadata}
        breadcrumbs={breadcrumbs}
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
