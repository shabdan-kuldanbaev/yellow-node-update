import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ArcherContainer } from 'react-archer';
import ProcessCard from 'UI/components/ProcessCard';
import SectionTitle from 'UI/components/SectionTitle';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const ProcessSection = (props) => {
  const {
    title,
    secondTitle,
    description,
    subtitle,
    secondSubtitle,
    cardsList,
    view,
    renderCards,
    pageType,
  } = useSectionProps(props);

  if (!cardsList?.length) {
    return null;
  }

  return (
    <section className={cn(styles.processSection, styles[pageType], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
          secondTitle={secondTitle}
          secondSubtitle={secondSubtitle}
        />
        <ArcherContainer
          strokeColor="#A0A0A0"
          strokeWidth={1}
          strokeDasharray={[5, 5]}
          noCurves
        >
          <div className={styles.cards}>
            {renderCards?.map((card) => (
              <ProcessCard
                {...card}
                key={`process-section/${card.svgType}`}
              />
            ))}
          </div>
        </ArcherContainer>
      </div>
    </section>
  );
};

ProcessSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
};

export default ProcessSection;
