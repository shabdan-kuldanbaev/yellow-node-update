import React from 'react';
import get from 'lodash/get';
import LinkWrapper from 'components/Common/LinkWrapper';
import { CASE_STUDIES } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';

const sectionsWithBackgrounds = [CASE_STUDIES.openSense];

export const isIntroHasBackground = (type) => sectionsWithBackgrounds.includes(type);
export const isTitleHasBackground = (type) => sectionsWithBackgrounds.includes(type);

export const caseStudyLink = (type, downloadLink) => {
  if (!downloadLink) {
    return null;
  }

  switch (type) {
  case CASE_STUDIES.openSense:
  case CASE_STUDIES.separateUs:
    return (
      <LinkWrapper path={downloadLink.url}>
        {downloadLink.buttonTitle}
      </LinkWrapper>
    );
  default:
    return null;
  }
};

export const getIntroProps = (type, data) => {
  const {
    title,
    subtitle,
    description,
    images,
    contentModules,
  } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
    [
      'title',
      'subtitle',
      'description',
      'images',
      'contentModules',
    ],
  );
  const { contentModules: experiences } = getDocumentFields(
    get(data, 'contentModules[1]', {}),
    ['contentModules'],
  );
  const downloadLink = getDocumentFields(get(contentModules, '[0]'));
  const appLogoUrl = getFileUrl(get(images, '[1]', ''));
  const appBackgroundImageUrl = getFileUrl(get(images, '[0]', ''));
  const backgroundImageUrl = getFileUrl(get(data, 'images[0]', ''));
  const sectionStyle = (backgroundImageUrl && !isIntroHasBackground(type))
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : {};

  const sectionBackground = backgroundImageUrl;

  return {
    sectionStyle,
    backgroundImageUrl,
    sectionBackground,
    appLogoUrl,
    title,
    subtitle,
    description,
    downloadLink,
    appBackgroundImageUrl,
    experiences,
  };
};
