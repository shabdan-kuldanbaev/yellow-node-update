import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CallToAction from 'UI/components/CallToAction';
import Animated from 'UI/containers/Animated';
import SectionTitle from 'UI/components/SectionTitle';
import NumberWithText from 'UI/components/Cards/NumberWithText';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useCheckListSection from './utils/useNumberedListSection';
import styles from './styles.module.scss';

const NumberedListSection = (props) => {
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
              key={`numbered-list/${index}`}
              transitionDelay={50 * index}
            >
              <NumberWithText
                value={index + 1}
                className={styles.card}
                noBackground={noCardBackground}
              >
                {text}
              </NumberWithText>
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
              className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
    </section>
  );
};

NumberedListSection.defaultProps = {
  handleOnCTAClick: () => {},
};

NumberedListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};

export default NumberedListSection;
