import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/Common/Svg';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { CASE_STUDIES } from 'utils/constants';
import { getAppstoreSvgType } from './utils/introHelper';

export const ProjectLink = ({
  linkStyles,
  type,
  downloadLink,
}) => {
  switch (type) {
  case CASE_STUDIES.tell:
  case CASE_STUDIES.fernwayer:
  case CASE_STUDIES.stickerbox:
  case CASE_STUDIES.fairy:
  case CASE_STUDIES.sevenPmThursday:
    return (
      <LinkWrapper path={downloadLink.url}>
        <Svg
          className={linkStyles}
          type={getAppstoreSvgType(type)}
        />
      </LinkWrapper>
    );
  case CASE_STUDIES.natp:
  case CASE_STUDIES.driveFocus:
  case CASE_STUDIES.writerChromeExtension:
  case CASE_STUDIES.beautonomy:
    return (
      <LinkWrapper path={downloadLink.url}>
        {downloadLink.buttonTitle}
      </LinkWrapper>
    );
  default:
    return null;
  }
};

ProjectLink.defaultProps = {
  linkStyles: '',
};

ProjectLink.propTypes = {
  linkStyles: PropTypes.string,
  type: PropTypes.string.isRequired,
  downloadLink: PropTypes.instanceOf(Object).isRequired,
};
