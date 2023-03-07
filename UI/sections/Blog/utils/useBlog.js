import { useSelector } from 'react-redux';
import { selectArticles } from 'redux/selectors/blog';
import { Mousewheel, Navigation } from 'swiper';
import { getDocumentFields } from 'utils/helper';

export const useBlog = ({ sectionData }) => {
  const articles = useSelector(selectArticles);

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
