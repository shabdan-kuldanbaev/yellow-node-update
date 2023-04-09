import get from 'lodash/get';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const useProjectIdea = ({ type, data }) => {
  const {
    title: sectionTitle,
    subtitle: sectionSubtitle,
    description: sectionDescription,
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
  const additionalContent = contentModules?.map((con) => getDocumentFields(con, ['title', 'contentList', 'description']));
  const imageUrl = getFileUrl(featuresProps.images?.[0]);

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
  };
};
