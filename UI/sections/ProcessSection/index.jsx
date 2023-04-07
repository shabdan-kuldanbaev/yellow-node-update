import PropTypes from 'prop-types';
import cn from 'classnames';
import { ArcherContainer } from 'react-archer';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const ProcessCard = dynamic(() => import('UI/components/ProcessCard'));

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
    type,
  } = useSectionProps(props);

  if (!cardsList?.length) {
    return null;
  }

  return (
    <section className={cn(styles.processSection, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          secondTitle={secondTitle}
          secondSubtitle={secondSubtitle}
          className={styles.titleStyle}
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
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ProcessSection;
