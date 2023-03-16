import CustomServices from 'containers/CustomService';
import { getServicePageProps, getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

const CustomWebApp = (pageProps) => (
  <CustomServices
    type={PAGES.customWebApp}
    {...pageProps}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.customWebApp, getServicePageProps);

export default CustomWebApp;
