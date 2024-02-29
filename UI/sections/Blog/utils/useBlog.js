import { Mousewheel, Navigation } from 'swiper';
import { getArticlesList } from 'utils/dataFetching/getArticlesList';
import { getDocumentFields } from 'utils/helper';

export const useBlog = ({ sectionData, articles }) => {
  const { title, description } = getDocumentFields(sectionData, ['title', 'description']);

  const swiperProps = {
    modules: [Navigation, Mousewheel],
    slidesPerView: 'auto',
    spaceBetween: 32,
    passiveListeners: true,
    mousewheel: {
      forceToAxis: true,
    },
  };

  return {
    title,
    articles,
    description,
    swiperProps,
  };
};
