import React from 'react';
import CardStack from 'UI/components/CardStack';
import SectionTitle from 'UI/components/SectionTitle';
import AppFeaturesItem from 'UI/components/AppFeaturesItem';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const AccordionCardStack = (props) => {
  const {
    type,
    view,
    title,
    description,
    cardStackData,
    contentModules,
    activeIndex,
    handleOnAccordionClick,
  } = useSectionProps(props);

  return (
    <section className={styles.section}>
      <SectionTitle
        title={title}
        description={description}
        className={styles.sectionTitle}
      />
      <div className={styles.contentWrapper}>
        {contentModules && (
          <div className={styles.accordion}>
            {contentModules?.map((module, index) => (
              <AppFeaturesItem
                view={view}
                type={type}
                data={module}
                currentIndex={index}
                activeIndex={activeIndex}
                handleOnClick={handleOnAccordionClick}
                className={styles.accordionItem}
              />
            ))}
          </div>
        )}
        <CardStack
          data={cardStackData}
          view={view}
          slug={type}
        />
      </div>
    </section>
  );
};

export default AccordionCardStack;
