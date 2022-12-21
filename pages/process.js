import ProcessContainer from 'UI/sections/Process';
import { processes } from 'utils/processes';

export const getStaticProps = () => ({
  props: {
    json: processes,
  },
  revalidate: 10,
});

export default ProcessContainer;
