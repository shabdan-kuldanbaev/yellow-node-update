import ProcessContainer from 'UI/views/Process';
import { processes } from 'utils/processes';

export const getStaticProps = () => ({
  props: {
    json: processes,
  },
  revalidate: 10,
});

export default ProcessContainer;
