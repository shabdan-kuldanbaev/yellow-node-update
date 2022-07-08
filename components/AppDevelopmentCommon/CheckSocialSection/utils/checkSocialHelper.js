import React from 'react';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export const getCheckSocialProps = (data) => {
  const {
    contentModules,
  } = getDocumentFields(data);
  const linkData = get(contentModules, '[0]', null);

  return {
    linkData,
  };
};
