import PersonContainer from 'UI/views/Person';
import { wrapper } from 'store/store';
import { getInitialPersonProps } from 'utils/personUtils';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => getInitialPersonProps(store, ctx));

export default PersonContainer;
