import React from 'react';
import DefaultIntro from 'components/CaseStudiesCommon/Intro/DefaultIntro';
import VerticalIntro from 'components/CaseStudiesCommon/Intro/VerticalIntro';
import { CASE_STUDIES } from 'utils/constants';

export const Intro = (props) => {
  switch (props.type) {
  case CASE_STUDIES.tell:
  case CASE_STUDIES.fernwayer:
  case CASE_STUDIES.stickerbox:
  case CASE_STUDIES.fairy:
  case CASE_STUDIES.sevenPmThursday:
  case CASE_STUDIES.natp:
    return <DefaultIntro {...props} />;
  case CASE_STUDIES.openSense:
  case CASE_STUDIES.separateUs:
    return <VerticalIntro {...props} />;
  default:
    return null;
  }
};
