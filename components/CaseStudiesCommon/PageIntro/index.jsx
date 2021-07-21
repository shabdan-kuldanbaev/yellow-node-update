import React from 'react';
import Intro from 'components/CaseStudiesCommon/Intro';
import VerticalIntro from 'components/CaseStudiesCommon/VerticalIntro';
import { CASE_STUDIES } from 'utils/constants';

export const PageIntro = (props) => {
  switch (props.type) {
  case CASE_STUDIES.tell:
  case CASE_STUDIES.fernwayer:
  case CASE_STUDIES.stickerbox:
  case CASE_STUDIES.fairy:
  case CASE_STUDIES.sevenPmThursday:
    return <Intro {...props} />;
  case CASE_STUDIES.openSense:
    return <VerticalIntro {...props} />;
  default:
    return null;
  }
};
