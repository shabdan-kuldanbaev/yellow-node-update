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
  case CASE_STUDIES.fireaway:
  case CASE_STUDIES.natp:
  case CASE_STUDIES.meatEater:
  case CASE_STUDIES.driveFocus:
  case CASE_STUDIES.cashChat:
  case CASE_STUDIES.travelTrivia:
  case CASE_STUDIES.writerChromeExtension:
  case CASE_STUDIES.blackBird:
  case CASE_STUDIES.ubiChat:
  case CASE_STUDIES.beautonomy:
  case CASE_STUDIES.famlicious:
  case CASE_STUDIES.dindon:
    return <DefaultIntro {...props} />;
  case CASE_STUDIES.openSense:
  case CASE_STUDIES.fusionMarkets:
  case CASE_STUDIES.separateUs:
  case CASE_STUDIES.telemojo:
  case CASE_STUDIES.smartcenter:
  case CASE_STUDIES.bionorica:
    return <VerticalIntro {...props} />;
  default:
    return null;
  }
};
