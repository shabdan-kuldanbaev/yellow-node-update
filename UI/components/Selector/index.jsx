import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SWIPER_PARAMS } from './utils/helpers';
import { useSelector } from './utils/useSelector';
import styles from './styles.module.scss';

const Selector = (props) => {
  const {
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  } = useSelector(props);

  return (
    <div className={styles.wrapper}>
      <Swiper {...SWIPER_PARAMS}>
        {displayNames.map((name, i) => (
          <SwiperSlide
            key={name}
            className={cn(styles.item, { [styles.selected]: i === selectedIndex })}
            onClick={handleSelectedIndexChange(i)}
          >
            <span>{name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Selector;
