import PersonContainer from 'UI/views/Person';
import { store } from 'store/store';
import { getInitialPersonProps } from 'utils/personUtils';

export const getServerSideProps = async (ctx) => getInitialPersonProps(store, ctx);

export default PersonContainer;
