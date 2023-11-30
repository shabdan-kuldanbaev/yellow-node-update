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
const ThreeCardsInRow = dynamic(() => import('UI/sections/Blog/ThreeCardsInRow'));
const FeedbackSection = dynamic(() => import('UI/sections/FeedbackSection'));

const PersonContainer = ({
  introSection,
  slug,
  id,
}) => {
  const { data: person = {} } = useFetchPersonQuery(slug);
  const { data: articles = [] } = useGetArticlesRelatedToPersonQuery({ id, limit: 3 });

  const {
    bio,
    fullName,
    position,
    quote,
  } = person;

  const personMetadata = {
    metaTitle: `Content Author ${fullName}, ${position} | Yellow`,
    metaDescription: quote.length <= 120 ? quote : `${bio.substring(0, 120)}`,
    url: `${rootUrl}${routes.person.getRoute(slug).path}`,
  };

  const breadcrumbs = getBreadcrumbs(PAGES.person, {
    slug,
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
            dark
            breadcrumbs={breadcrumbs}
          />
        </div>
        <PersonIntro
          {...person}
          introSection={introSection}
        />
        <ThreeCardsInRow
          title="Latest blog posts"
          data={articles}
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
