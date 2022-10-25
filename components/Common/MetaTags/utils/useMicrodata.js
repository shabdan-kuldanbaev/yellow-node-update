import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import { microdata as Microdata } from 'utils/microdata';

export const useMicrodata = ({ pageMicrodata, breadcrumbs }) => useMemo(() => {
  const microdata = Array.isArray(pageMicrodata) ? [...pageMicrodata] : [];

  if (!isEmpty(pageMicrodata)) {
    microdata.push(pageMicrodata);
  }

  if (!isEmpty(breadcrumbs)) {
    microdata.push(Microdata.breadcrumbs({ breadcrumbsList: breadcrumbs }));
  }

  return microdata;
}, [pageMicrodata, breadcrumbs]);
