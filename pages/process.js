import React from 'react';
import ProcessContainer from 'containers/Process';
import { processes } from 'utils/processes';

export const getStaticProps = () => ({
  props: {
    json: processes,
  },
  revalidate: 10,
});

export default ProcessContainer;
