import React from 'react';
import Signature from 'containers/Signature';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const SignatureGenerator = () => <Signature />;

export const getStaticProps = getStaticPropsWrapper(PAGES.signatureGenerator);

export default SignatureGenerator;
