import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import Animated from 'components/Common/Animated';
import SelectorElement from 'components/PortfolioCommon/SelectorElement';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { SELECTOR_ELEMENT_TYPES } from 'components/PortfolioCommon/SelectorElement/utils';
import CustomSwiper from 'UI/containers/CustomSwiper';
import { SWIPER_PARAMS } from './utils';
import styles from './styles.module.scss';

function TypeSelector({ selectedType, onSelectedTypeChange, typeList }) {
  const handleTypeChange = (type) => () => {
    onSelectedTypeChange(type);
  };

  return (
    <CustomSwiper swiperParams={SWIPER_PARAMS}>
      {typeList.map((type) => (
        <SwiperSlide
          key={type.displayName}
          className={styles.slide}
        >
          <SelectorElement
            type={SELECTOR_ELEMENT_TYPES.typeSelector}
            displayName={type.displayName}
            onClick={handleTypeChange(type)}
            selected={type === selectedType}
            key={`WORK-TYPE/${type.slug}`}
          />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
}

TypeSelector.propTypes = {
  selectedType: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  onSelectedTypeChange: PropTypes.func.isRequired,
};

export default TypeSelector;
