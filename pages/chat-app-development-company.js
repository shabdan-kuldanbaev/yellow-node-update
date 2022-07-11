import React from 'react';
import CustomService from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const CustomChatApp = () => <CustomService type={PAGES.customChatApp} />;

export const getStaticProps = getStaticPropsWrapper(PAGES.customChatApp);

export default CustomChatApp;
