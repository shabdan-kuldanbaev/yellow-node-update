import Home from 'containers/Home';
import { getHomePageDataPros, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

export const getStaticProps = getStaticPropsWrapper(PAGES.homepage, getHomePageDataPros);

export default Home;
