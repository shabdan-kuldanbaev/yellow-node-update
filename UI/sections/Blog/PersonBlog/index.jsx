import React from 'react';
import Paginator from 'UI/components/Paginator';
import ArticlesList from 'components/BlogCommon/ArticlesList';
import SectionTitle from 'UI/components/SectionTitle';
import { ROUTES } from 'utils/constants';
import useThreeCardsInRow from '../utils/usePersonBlog';
import styles from './styles.module.scss';

const PersonPageBlog = (props) => {
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

export default PersonPageBlog;
