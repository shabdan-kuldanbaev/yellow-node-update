import ContactUs from 'UI/views/ContactUs';
import { getStaticPropsWrapper } from 'utils/dataSelectors';
import { PAGES } from 'utils/constants';

export const getStaticProps = getStaticPropsWrapper(PAGES.contact);

export default ContactUs;
