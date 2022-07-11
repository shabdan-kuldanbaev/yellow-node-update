import React from 'react';
import ContactUsContainer from 'containers/ContactUs';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const ContactUs = ({ introSection }) => <ContactUsContainer introSection={introSection} />;

export const getStaticProps = getStaticPropsWrapper(PAGES.contact);

export default ContactUs;
