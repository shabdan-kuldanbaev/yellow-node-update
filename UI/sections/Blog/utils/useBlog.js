import blogApi from 'redux/apis/blog';
import { Mousewheel, Navigation } from 'swiper';
import { getDocumentFields } from 'utils/helper';

export const useBlog = ({ sectionData, blogQuery }) => {
  const { data = {} } = blogApi.useGetArticlesListQuery(blogQuery);
  const { items: articles = [] } = data;

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
