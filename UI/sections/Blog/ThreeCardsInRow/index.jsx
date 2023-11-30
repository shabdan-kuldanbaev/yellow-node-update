import React from 'react';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import useThreeCardsInRow from '../utils/useThreeCardsInRow';
import styles from './styles.module.scss';

const BlogCard = dynamic(() => import('UI/components/Cards/BlogCard'), { ssr: false });

const ThreeCardsInRow = (props) => {
  const {
    title,
    description,
    articles,
  } = useThreeCardsInRow(props);

  return (
    <section className={styles.section}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          {articles.map((article, index) => (
            <BlogCard
              key={`artcile_${index}`}
              index={index}
              {...article}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeCardsInRow;
