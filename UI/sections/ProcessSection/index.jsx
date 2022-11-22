import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ArcherContainer, ArcherElement } from 'react-archer';
import Svg from 'components/Common/Svg';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
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

  if (!cardsList.length) {
    return null;
  }

  return (
    <div className={cn(styles[pageType], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
        />
        {secondTitle
          && (<h3 className={styles.secondTitle}>{secondTitle}</h3>)}
        {secondSubtitle
          && (<p className={styles.secondSubtitle}>{secondSubtitle}</p>)}
        <ArcherContainer
          strokeColor="#A0A0A0"
          strokeWidth={1}
          strokeDasharray={[5, 5]}
          noCurves
        >
          <div className={styles.cards}>
            {renderCards?.map((card) => {
              const {
                svgType,
                relations,
                typeTitle,
                text,
                index,
              } = card;

              return (
                <ArcherElement
                  key={`process-section/${svgType}`}
                  id={`element${index + 1}`}
                  relations={relations}
                >
                  <div className={styles.cardContainer}>
                    <div className={styles.imageWrapper}>
                      <Svg type={svgType} />
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.typeTitle}>
                        {typeTitle}
                      </div>
                      <ContentfulParser document={text} />
                    </div>
                  </div>
                </ArcherElement>
              );
            })}
          </div>
        </ArcherContainer>
      </div>
    </div>
  );
};

ProcessSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
};

export default ProcessSection;
