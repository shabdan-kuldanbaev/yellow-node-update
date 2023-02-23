import React from 'react';
import { CASE_STUDIES } from 'utils/constants';
import DefaultIntro from './DefaultIntro';

const CaseStudiesIntro = (props) => {
  switch (props.type) {
  case CASE_STUDIES.stickerbox:
  case CASE_STUDIES.fireaway:
  case CASE_STUDIES.fairy:
  case CASE_STUDIES.sevenPmThursday:
  case CASE_STUDIES.fernwayer:
  case CASE_STUDIES.hotelDataCloud:
  case CASE_STUDIES.separateUs:
  case CASE_STUDIES.famlicious:
  case CASE_STUDIES.natp:
    return <DefaultIntro {...props} />;
  default:
    return null;
  }
};

export default CaseStudiesIntro;
