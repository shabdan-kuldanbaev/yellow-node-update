import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Svg } from 'components/AppDevelopmentCommon/Svg';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields } from 'utils/helper';
import { getCardsProps, getCardRelations } from './utils/cardsHelper';
import styles from './styles.module.scss';

const ProcessSection = ({
  sectionData,
  pageType,
  isMobileResolution,
}) => {
  const {
    title,
    description,
    subtitle,
    cardsList,
    view,
  } = getCardsProps(sectionData);

  if (!cardsList || !cardsList.length) {
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
        <ArcherContainer
          strokeColor="#A0A0A0"
          strokeWidth={1}
          strokeDasharray={[5, 5]}
          noCurves
        >
          <div className={styles.cards}>
            {cardsList.map((card, index, array) => {
              const {
                title: typeTitle,
                contentList,
                text,
              } = getDocumentFields(card);
              const svgType = get(contentList, '[0]');
              const relations = getCardRelations(index, array, isMobileResolution);

              return (
                <ArcherElement
                  id={`element${index + 1}`}
                  relations={relations}
                >
                  <div className={styles.cardContainer}>
                    <div className={styles.svgWrapper}>
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
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(ProcessSection);
