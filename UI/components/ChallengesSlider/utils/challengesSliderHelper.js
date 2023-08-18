import { Pagination } from 'swiper';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import styles from '../styles.module.scss';

export const getSwiperParams = (type) => {
  const pagination = type === CASE_STUDIES_TYPES.challengesSpecialSlider ? {} : {
    spaceBetween: 50,
    pagination: {
      type: 'bullets',
      clickable: true,
      bulletClass: styles.swiperBullet,
      bulletActiveClass: styles.swiperBulletActive,
    },
  };

  return ({
    modules: [Pagination],
    ...pagination,
  });
};
