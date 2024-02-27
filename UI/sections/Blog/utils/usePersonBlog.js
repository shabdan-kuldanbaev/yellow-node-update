import { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { routes } from 'utils/routes';

export default ({
  title = '',
  description = '',
  currentPage,
  articlesNumberPerPage,
  items,
  total,
}) => {
  const articlesList = items?.map((article) => {
    const {
      previewImageUrl: image,
      tagsList,
      ...fields
    } = getDocumentFields(
      article,
      [
        'introduction',
        'previewImageUrl',
        'publishedAt',
        'slug',
        'title',
        'tagsList',
      ],
    );

    const tagsListCollection = { items: tagsList.map((tag) => getDocumentFields(tag, ['slug'])) };
    const previewImageUrl = { url: getFileUrl(image) };

    return {
      previewImageUrl,
      tagsListCollection,
      ...fields,
    };
  });

  const pagesCounter = Math.ceil(total / articlesNumberPerPage);

  const { push: navigateTo } = useRouter();
  const { slug } = useParams();

  const sectionRef = useRef(null);

  const handlePageChange = (page) => {
    const { path } = routes.person.getRoute(slug, page);

    navigateTo(path, { scroll: false });
    window.scrollTo(0, sectionRef.current.offsetTop - 100);
  };

  return {
    title,
    description,
    articlesList,
    currentPage,
    pagesCounter,
    sectionRef,
    handlePageChange,
  };
};
