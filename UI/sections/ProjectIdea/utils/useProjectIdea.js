import get from 'lodash/get';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';

export const useProjectIdea = ({ type, data }) => {
  const {
    title: sectionTitle,
    subtitle: sectionSubtitle,
    description: sectionDescription,
    view,
    background,
  } = data;

  const {
    title,
    subtitle,
    text,
    contentModules,
  } = getDocumentFields(get(data, 'contentModules[1]', {}));
  const delayedAnimation = {
    ...ANIMATION_CASE_STUDY_PROPS,
    delay: 50,
  };

  const featuresProps = getDocumentFields(get(data, 'contentModules[0]'));
  const teamListProps = getDocumentFields(get(data, 'contentModules[2]'));
  const imageContent = getDocumentFields(get(data, 'contentModules[3]', {}));
  const additionalContent = contentModules?.map((con) => getDocumentFields(con, ['title', 'contentList', 'description', 'text']));
  const textContent = imageContent?.contentModules?.map((con) => getDocumentFields(con, ['title', 'contentList', 'description']));
  const imageUrl = getFileUrl(imageContent?.images?.[0]);

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
    imageUrl,
    textContent,
    view,
    background: getImage(background),
  };
};
