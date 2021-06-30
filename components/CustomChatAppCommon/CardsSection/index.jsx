import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import { FullLayout } from 'components/Layout/FullLayout';
import { Svg } from 'components/Common/Svg';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

export const CardsSection = ({
  sectionData,
  hasCTAButton,
  type,
}) => {
  const {
    title,
    description,
    contentModules: chatTypes,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
    ],
  );
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  if (!chatTypes || !chatTypes.length) {
    return null;
  }

  return (
    <FullLayout
      disableMaxWidth
      disableTopPadding
      disableSidePadding
      disableBottomPadding
    >
      <div className={cn(styles.typesOfChatSectionContainer, styles[type])}>
        <div className={styles.typesOfChatSection}>
          <SectionTitle
            title={title}
            text={description}
          />
          <div className={styles.typesList}>
            {chatTypes.map((chatType, index) => {
              const {
                title: typeTitle,
                description: typeDescription,
                contentList,
              } = getDocumentFields(
                chatType,
                [
                  'title',
                  'description',
                  'contentList',
                ],
              );
              const svgType = get(contentList, '[0]');

              return (
                <Animated
                  key={`cards/${typeTitle}`}
                  {...animatedProps}
                  transitionDelay={750 + 50 * index}
                >
                  <Svg type={svgType} />
                  <p className={styles.typeTitle}>
                    {typeTitle}
                  </p>
                  <p className={styles.typeSubtitle}>
                    {typeDescription}
                  </p>
                </Animated>
              );
            })}
          </div>
          {hasCTAButton && (
            <Animated
              {...animatedProps}
              transitionDelay={900}
            >
              <ButtonMore
                href="/contact"
                title="Request proposal"
                buttonStyle={styles.button}
              />
            </Animated>
          )}
        </div>
      </div>
    </FullLayout>
  );
};

CardsSection.defaultProps = {
  hasCTAButton: false,
};

CardsSection.propTypes = {
  sectionData: PropTypes.instanceOf(Array).isRequired,
  hasCTAButton: PropTypes.bool,
  type: PropTypes.string.isRequired,
};
