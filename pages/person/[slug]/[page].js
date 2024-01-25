import PersonContainer from 'UI/views/Person';
import { reduxStore } from 'redux/store';
import { getInitialPersonProps } from 'utils/personUtils';

export const getServerSideProps = async (ctx) => getInitialPersonProps(reduxStore, ctx);

export default PersonContainer;
