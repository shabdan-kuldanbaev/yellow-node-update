import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { selectTypes } from 'redux/selectors/portfolio';
import Animated from 'components/Common/Animated';
import SelectorElement from 'components/PortfolioCommon/SelectorElement';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { SELECTOR_ELEMENT_TYPES } from 'components/PortfolioCommon/SelectorElement/utils';
import { SWIPER_CONFIG } from '.config';
import styles from './styles.module.scss';

function TypeSelector({ selectedType, onSelectedTypeChange }) {
  const typeList = useSelector(selectTypes);

  const handleTypeChange = (type) => () => {
    onSelectedTypeChange(type);
  };

  return (
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={250}
    >
      <Swiper {...SWIPER_CONFIG}>
        {typeList.map((type) => (
          <SwiperSlide key={type.displayName}>
            <SelectorElement
              type={SELECTOR_ELEMENT_TYPES.typeSelector}
              displayName={type.displayName}
              onClick={handleTypeChange(type)}
              selected={type === selectedType}
              className={styles.type}
              key={`WORK-TYPE/${type.slug}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Animated>
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
