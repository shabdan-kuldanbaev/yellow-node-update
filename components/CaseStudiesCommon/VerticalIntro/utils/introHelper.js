import React from 'react';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { CASE_STUDIES } from 'utils/constants';

export const isIntroHasBackground = (type) => [CASE_STUDIES.openSense].includes(type);
export const isTitleHasBackground = (type) => [CASE_STUDIES.openSense].includes(type);

export const caseStudyLink = (type, downloadLink) => {
  switch (type) {
  case CASE_STUDIES.openSense:
    return (
      <div>
        <LinkWrapper path={downloadLink.url}>
          {downloadLink.buttonTitle}
        </LinkWrapper>
      </div>
    );
  default:
    return null;
  }
};
