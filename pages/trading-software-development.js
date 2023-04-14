import CustomServices from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

export const getStaticProps = getStaticPropsWrapper(PAGES.tradingSoftwareDevelopment);

export default CustomServices;
