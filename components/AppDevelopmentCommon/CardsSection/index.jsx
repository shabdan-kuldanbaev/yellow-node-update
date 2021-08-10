import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { CallToAction } from 'components/Common/CallToAction';
import { Svg } from 'components/AppDevelopmentCommon/Svg';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import { getCardsProps } from './utils/cardsHelper';
import styles from './styles.module.scss';

export const CardsSection = ({
  sectionData,
  handleOnCTAClick,
  pageType,
  sectionType,
}) => {
  const {
    title,
    description,
    subtitle,
    cardsList,
    link,
    view,
  } = getCardsProps(sectionData);
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

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
        />
        <div className={cn(styles.typesList, styles[sectionType])}>
          {cardsList.map((chatType, index) => {
            const {
              title: typeTitle,
              description: typeDescription,
              contentList,
              text,
            } = getDocumentFields(
              chatType,
              [
                'title',
                'description',
                'contentList',
                'text',
              ],
            );
            const svgType = get(contentList, '[0]');

            return (
              <Animated
                key={`cards/${typeTitle}`}
                {...animatedProps}
                transitionDelay={750 + 50 * index}
              >
                <div>
                  <Svg type={svgType} />
                </div>
                <div>
                  <p className={styles.typeTitle}>
                    {typeTitle}
                  </p>
                  <ContentfulParser document={text} />
                </div>
              </Animated>
            );
          })}
        </div>
        {link && (
          <Animated
            {...animatedProps}
            transitionDelay={900}
          >
            <CallToAction
              type="card"
              title={link.linkTitle}
              buttonTitle={link.buttonTitle}
              handleOnClick={handleOnCTAClick}
              className={styles.cta}
            />
          </Animated>
        )}
      </div>
    </div>
  );
};

CardsSection.defaultProps = {
  handleOnCTAClick: () => {},
};

CardsSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
  sectionType: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};
