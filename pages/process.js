import ProcessContainer from 'UI/views/Process';
import { PAGES } from 'utils/constants';
import { getProcessProps, getStaticPropsWrapper } from 'utils/dataSelectors';

export const getStaticProps = getStaticPropsWrapper(PAGES.process, getProcessProps);

export default ProcessContainer;
