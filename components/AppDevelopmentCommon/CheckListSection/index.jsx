import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/Common/Svg';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import { getCheckListProps } from './utils/checkListHepler';
import styles from './styles.module.scss';

export const CheckListSection = ({ sectionData, type }) => {
  const {
    animationProps,
    title,
    description,
    view,
    listData,
  } = getCheckListProps(sectionData);

  if (!listData || !listData.length) {
    return null;
  }

  return (
    <section className={cn(styles[type], styles[view])}>
      <div className={styles.sectionContainer}>
        <SectionTitle
          title={title}
          description={description}
        />
        <div className={styles.checkList}>
          {listData.map((item, index) => {
            const { title: itemTitle } = getDocumentFields(item);

            return (
              <Animated
                key={`check-list/${item}`}
                {...animationProps}
                transitionDelay={600 + 50 * index}
              >
                <Svg type={SVG_IMAGES_TYPES.yellowCheckMark} />
                <p className={styles.itemTitle}>
                  {itemTitle}
                </p>
              </Animated>
            );
          })}
        </div>
      </div>
    </section>
  );
};

CheckListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
