import { get } from 'lodash';
import { getDocumentFields } from 'utils/helper';

export const usePrototypeSection = ({ data, type }) => {
  const { title, description } = data;

  const contentModules = get(data, 'contentModules');

  const { url } = getDocumentFields(contentModules[0]);

  return {
    title, description, url, type,
  };
};
