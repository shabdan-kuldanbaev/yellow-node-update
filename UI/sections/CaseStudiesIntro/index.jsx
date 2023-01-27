import React from 'react';
import { CASE_STUDIES } from 'utils/constants';
import DefaultIntro from './DefaultIntro';

const CaseStudiesIntro = (props) => {
  switch (props.type) {
  case CASE_STUDIES.stickerbox:
  case CASE_STUDIES.fireaway:
  case CASE_STUDIES.fairy:
    return <DefaultIntro {...props} />;
  default:
    return null;
  }
};

export default CaseStudiesIntro;
