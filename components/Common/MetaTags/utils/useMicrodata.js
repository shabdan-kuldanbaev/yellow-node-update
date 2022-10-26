import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import { microdata as Microdata } from 'utils/microdata';

export const useMicrodata = ({ pageMicrodata, breadcrumbs }) => useMemo(() => {
  const microdata = [];

  if (!isEmpty(breadcrumbs)) {
    microdata.push(Microdata.breadcrumbs({ breadcrumbsList: breadcrumbs }));
  }

  if (!isEmpty(pageMicrodata)) {
    microdata.push(...(Array.isArray(pageMicrodata) ? pageMicrodata : [pageMicrodata]));
  }

  return microdata;
}, [pageMicrodata, breadcrumbs]);
