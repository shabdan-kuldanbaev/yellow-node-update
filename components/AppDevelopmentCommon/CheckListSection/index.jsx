import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import Svg from 'components/Common/Svg';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import CallToAction from 'components/Common/CallToAction';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import { getCheckListProps } from './utils/checkListHepler';
import styles from './styles.module.scss';

const CheckListSection = ({
  sectionData,
  type,
  isNumberedList,
  handleOnCTAClick,
}) => {
  const {
    animationProps,
    title,
    description,
    view,
    listData,
    link,
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
            const {
              title: itemTitle,
              text,
            } = getDocumentFields(item);

            return (
              <Animated
                key={`check-list/${itemTitle}`}
                {...animationProps}
                transitionDelay={250 + 50 * index}
              >
                <div className={styles.itemContainer}>
                  {isNumberedList
                    ? (
                      <h3 className={styles.number}>
                        {itemTitle}
                      </h3>
                    )
                    : (
                      <div>
                        <Svg type={SVG_IMAGES_TYPES.yellowCheckMark} />
                      </div>
                    )}
                  <div className={styles.itemText}>
                    <ContentfulParser document={text} />
                  </div>
                </div>
              </Animated>
            );
          })}
        </div>
        {link && (
          <Animated
            {...animationProps}
            transitionDelay={550}
          >
            <CallToAction
              type="card"
              title={link.title}
              buttonTitle={link.buttonTitle}
              handleOnClick={handleOnCTAClick}
              className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
    </section>
  );
};

CheckListSection.defaultProps = {
  isNumberedList: false,
  handleOnCTAClick: () => {},
};

CheckListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  isNumberedList: PropTypes.bool,
  handleOnCTAClick: PropTypes.func,
};

export default CheckListSection;
