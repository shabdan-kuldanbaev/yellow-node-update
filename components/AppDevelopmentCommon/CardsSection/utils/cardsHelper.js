import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export const getCardsProps = (data) => {
  let link = null;
  const {
    title,
    description,
    subtitle,
    contentModules,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
    ],
  );
  const { contentModules: cardsList } = getDocumentFields(get(contentModules, '[0]', []));
  const linkData = get(contentModules, '[1]', null);

  if (linkData) {
    const {
      title: linkTitle,
      buttonTitle,
      type,
      isOpenFeedbackForm,
    } = getDocumentFields(linkData);

    link = {
      linkTitle,
      buttonTitle,
      type,
      isOpenFeedbackForm,
    };
  }

  return {
    title,
    description,
    subtitle,
    cardsList,
    link,
  };
};
