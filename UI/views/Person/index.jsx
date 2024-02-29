'use client';

import { useContext } from 'react';
import Breadcrumbs from 'UI/components/Breadcrumbs';
import PersonIntro from 'UI/sections/PersonIntro';
import PersonBlog from 'UI/sections/Blog/PersonBlog';
import FeedbackSection from 'UI/sections/FeedbackSection';
import { ARTICLES_NUMBER_PER_PERSON_PAGE } from 'utils/constants';
import { IntroSectionContext } from 'utils/appContext';
import styles from './styles.module.scss';

const PersonContainer = ({
  person,
  articlesData,
  currentPage,
  breadcrumbs,
  children,
}) => {
  const introSection = useContext(IntroSectionContext);

  return (
    <>
      {children}
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
          articlesNumberPerPage={ARTICLES_NUMBER_PER_PERSON_PAGE}
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
