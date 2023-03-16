import Signature from 'containers/Signature';
import { getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

export const getStaticProps = getStaticPropsWrapper(PAGES.signatureGenerator);

export default Signature;
