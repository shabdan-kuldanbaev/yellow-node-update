import CustomService from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

export const getStaticProps = getStaticPropsWrapper(PAGES.aiDevelopment, getServicePageProps);

export default CustomService;
