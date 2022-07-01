import React from 'react';
import Swiper from 'react-id-swiper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectTypes } from 'redux/selectors/portfolio';
import { Animated } from 'components/Common/Animated';
import SelectorElement from 'components/PortfolioCommon/SelectorElement';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { SELECTOR_ELEMENT_TYPES } from 'components/PortfolioCommon/SelectorElement/utils';
import styles from './styles.module.scss';

const TypeSelector = ({
  selectedType,
  onSelectedTypeChange,
  typeList,
}) => {
  const params = {
    containerClass: styles.container,
    slideClass: styles.slide,
    slidesPerView: 'auto',
    passiveListeners: true,
    speed: 500,
    mousewheel: {
      forceToAxis: true,
    },
  };

  return (
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={250}
    >
      <Swiper {...params}>
        {typeList.map((type) => (
          <SelectorElement
            type={SELECTOR_ELEMENT_TYPES.typeSelector}
            displayName={type.displayName}
            onClick={() => onSelectedTypeChange(type)}
            selected={type === selectedType}
            className={styles.type}
            key={`WORK-TYPE/${type.slug}`}
          />
        ))}
      </Swiper>
    </Animated>
  );
};

TypeSelector.propTypes = {
  selectedType: PropTypes.instanceOf(Object).isRequired,
  onSelectedTypeChange: PropTypes.func.isRequired,
  typeList: PropTypes.arrayOf(Object).isRequired,
};

export default connect(
  (state) => ({ typeList: selectTypes(state) }),
)(TypeSelector);
