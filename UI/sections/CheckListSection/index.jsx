import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import CallToAction from 'UI/components/CallToAction';
import CheckWithText from 'UI/components/Cards/CheckWithText';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import SectionTitle from 'UI/components/SectionTitle';
import styles from './styles.module.scss';
import useCheckListSection from './utils/useCheckListSection';

const CheckListSection = (props) => {
  const {
    list,
    type,
    view,
    title,
    description,
    link,
    handleOnCTAClick,
    noCardBackground,
  } = useCheckListSection(props);

  if (!list.length) {
    return null;
  }

  return (
    <section className={cn(styles.checkListSection, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          description={description}
        />
        <div className={styles.checkList}>
          {list.map((text, index) => (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              key={`check-list/${index}`}
              transitionDelay={50 * index}
            >
              <CheckWithText
                className={styles.card}
                noBackground={noCardBackground}
              >
                {text}
              </CheckWithText>
            </Animated>
          ))}
        </div>
        {link && (
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50}
          >
            <CallToAction
              type="card"
              title={link.title}
              buttonTitle={link.buttonTitle}
              handleOnClick={handleOnCTAClick}
              // className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
    </section>
  );
};

CheckListSection.defaultProps = {
  handleOnCTAClick: () => {},
};

CheckListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};

export default CheckListSection;
