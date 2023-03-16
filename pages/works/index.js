import PortfolioContainer from 'containers/Portfolio';
import { PAGES } from 'utils/constants';
import { getPortfolioPageProps, getStaticPropsWrapper } from 'utils/dataSelectors';

export const getStaticProps = getStaticPropsWrapper(PAGES.portfolio, getPortfolioPageProps);

export default PortfolioContainer;
