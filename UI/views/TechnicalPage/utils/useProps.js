import { getDocumentFields } from 'utils/helper';

export default function useProps({
  data,
  ...rest
}) {
  const {
    contentModules = [],
    pageTitle,
  } = data;

  const textModule = contentModules[0] || {};

  const { text } = getDocumentFields(textModule, ['text']);

  const { sys: { updatedAt } = {} } = textModule;

  return {
    updatedAt,
    text,
    title: pageTitle,
    ...rest,
  };
}
