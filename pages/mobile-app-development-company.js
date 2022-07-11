import React from 'react';
import CustomService from 'containers/CustomService';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const CustomMobileApp = () => <CustomService type={PAGES.customMobileApp} />;

export const getStaticProps = getStaticPropsWrapper(PAGES.customMobileApp);

export default CustomMobileApp;
