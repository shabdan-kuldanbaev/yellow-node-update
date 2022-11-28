import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({
  section,
  type,
  handleOnCTAClick,
}) => {
  const {
    contentModules,
    ...rest
  } = getDocumentFields(
    section,
    [
      'view',
      'title',
      'description',
      'contentModules',
    ],
  );

  const { contentModules: rawReviews } = getDocumentFields(get(contentModules, '[0]', []), ['contentModules']);
  const reviews = (rawReviews || []).map((item) => {
    const {
      contentModules: rawPerson,
      text,
      images,
      contentList: companyTitle,
    } = getDocumentFields(
      item,
      [
        'contentList',
        'text',
        'images',
        'contentModules',
      ],
    );

    const companyLogo = getFileUrl(get(images, '[0]'));

    const {
      fullName,
      avatar,
      position,
    } = getDocumentFields(
      get(rawPerson, '[0]'),
      [
        'fullName',
        'position',
        'avatar',
      ],
    );
    const avatarUrl = getFileUrl(avatar);

    return {
      companyTitle,
      companyLogo,
      text,
      author: {
        name: fullName,
        position,
        avatar: avatarUrl,
      },
    };
  });

  return {
    type,
    handleOnCTAClick,
    reviews,
    ...rest,
  };
};
