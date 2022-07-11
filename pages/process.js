import React from 'react';
import ProcessContainer from 'containers/Process';
import { processes } from 'utils/processes';

const Process = ({ introSection, json }) => (
  <ProcessContainer
    introSection={introSection}
    json={json}
  />
);

export const getStaticProps = () => ({
  props: {
    json: processes,
  },
  revalidate: 10,
});

export default Process;
