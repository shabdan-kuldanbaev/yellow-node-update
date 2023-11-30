import React from 'react';
import dynamic from 'next/dynamic';
import Paginator from 'UI/components/Paginator';
import ArticlesList from 'components/BlogCommon/ArticlesList';
import SectionTitle from 'UI/components/SectionTitle';
import { ROUTES } from 'utils/constants';
import useThreeCardsInRow from '../utils/useThreeCardsInRow';
import styles from './styles.module.scss';

const SixCardsInRow = (props) => {
  const {
    title,
    description,
    articlesList,
    currentPage,
    pagesCounter,
  } = useThreeCardsInRow(props);

  return (
    <section className={styles.section}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <div className={styles.container}>
        <ArticlesList
          articles={articlesList}
          currentPage={currentPage}
        />

        {!!pagesCounter && (
          <Paginator
            pagesCounter={pagesCounter}
            currentPage={currentPage}
            pageSlug={ROUTES.person.slug}
          />
        )}
      </div>
    </section>
  );
};

export default SixCardsInRow;
