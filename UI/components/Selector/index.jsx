import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from './utils/useSelector';
import { SELECTOR_SWIPER_PARAMS } from './utils/helpers';
import styles from './styles.module.scss';

const Selector = (props) => {
  const {
    view,
    type,
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  } = useSelector(props);

  return (
    <div className={cn(styles.wrapper, styles[type], styles[view])}>
      <Swiper {...SELECTOR_SWIPER_PARAMS}>
        {displayNames?.map((name, i) => (
          <SwiperSlide
            key={name}
            className={cn(styles.item, { [styles.selected]: i === selectedIndex })}
            onClick={handleSelectedIndexChange(i)}
          >
            <span>{name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.itemsContainer}>
        {displayNames?.map((name, i) => (
          <div
            key={name}
            className={cn(styles.item, { [styles.selected]: i === selectedIndex })}
            onClick={handleSelectedIndexChange(i)}
          >
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selector;
