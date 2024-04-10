import get from 'lodash/get';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { getDocumentFields } from 'utils/helper';

export const useProjectIdea = ({ type, data }) => {
  const {
    title: sectionTitle,
    subtitle: sectionSubtitle,
    description: sectionDescription,
    view,
    background,
    images,
  } = data;

  const {
    title,
    subtitle,
    text,
    contentModules,
  } = getDocumentFields(get(data, 'contentModules[1]', {}), [
    'title',
    'subtitle',
    'text',
    'contentModules',
  ]);
  const delayedAnimation = {
    ...ANIMATION_CASE_STUDY_PROPS,
    delay: 50,
  };

  const featuresProps = getDocumentFields(get(data, 'contentModules[0]', {}), ['contentModules']);
  const teamListProps = data?.contentModules?.[2] && getDocumentFields(
    get(data, 'contentModules[2]', {}),
    [
      'title',
      'contentModules',
      'contentList',
      'imagesBundles',
    ],
  );
  const imageContent = getDocumentFields(get(data, 'contentModules[3]', {}), ['contentModules', 'images']);
  const additionalContent = contentModules?.map(
    (con) => getDocumentFields(con, [
      'title',
      'contentList',
      'description',
      'text',
    ]),
  );
  const textContent = imageContent?.contentModules?.map((con) => getDocumentFields(con, ['title', 'contentList', 'description']));

  return {
    type,
    sectionTitle,
    sectionDescription,
    sectionSubtitle,
    title,
    subtitle,
    text,
    additionalContent,
    delayedAnimation,
    featuresProps,
    teamListProps,
    image: imageContent?.images?.[0],
    textContent,
    view,
    background,
    images,
  };
};
