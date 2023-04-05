import get from 'lodash/get';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { getDocumentFields } from 'utils/helper';

export const useProjectIdea = ({ type, data }) => {
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
  const additionalContent = contentModules?.map((con) => getDocumentFields(con, ['title', 'contentList']));

  return {
    type,
    title,
    subtitle,
    text,
    additionalContent,
    delayedAnimation,
    featuresProps,
    teamListProps,
  };
};
