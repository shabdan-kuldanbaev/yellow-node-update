import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/Common/Svg';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

export const CardsListSection = ({ sectionData, type }) => {
  const animationProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
    ],
  );
  const { contentModules: listData } = getDocumentFields(get(contentModules, '[0]', []));

  if (!listData || !listData.length) {
    return null;
  }

  return (
    <section className={styles[type]}>
      <div className={styles.sectionContainer}>
        <SectionTitle
          title={title}
          description={description}
        />
        <div className={styles.advantagesList}>
          {listData.map((advantage, index) => {
            const { title: advantageTitle } = getDocumentFields(advantage);

            return (
              <Animated
                key={`advantages/${advantage}`}
                {...animationProps}
                transitionDelay={600 + 50 * index}
              >
                <div>
                  <Svg type={SVG_IMAGES_TYPES.yellowCheckMark} />
                </div>
                <p className={styles.advantageTitle}>
                  {advantageTitle}
                </p>
              </Animated>
            );
          })}
        </div>
      </div>
    </section>
  );
};

CardsListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Array).isRequired,
};
