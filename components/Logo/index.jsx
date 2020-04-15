import React from 'react';
import PropTypes from 'prop-types';
import { themes } from 'utils/helper';
import { logoSize } from 'styles/utils/_variables.scss';
import { LinkWrapper } from 'components';

const Logo = ({ theme }) => (
  <LinkWrapper
    isLocalLink
    dynamicRouting="/"
    path="/"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width={logoSize} height="50" viewBox="0 0 131 50">
      <g fill="none" fillRule="evenodd">
          <path fill={themes[theme].main} fillRule="nonzero" d="M63.298 38.572c-.037 0-.075-.033-.112-.098a.473.473 0 0 1-.056-.238V36.22c0-.093.028-.173.084-.238a.252.252 0 0 1 .196-.098c.616-.019 1.101-.098 1.456-.238.355-.14.64-.41.854-.812.215-.401.369-.985.462-1.75l-.028-.168-3.528-13.888v-.112c0-.168.103-.252.308-.252h2.744c.224 0 .345.103.364.308l1.708 9.268c.019.056.047.084.084.084.037 0 .065-.028.084-.084l1.652-9.268c.019-.205.14-.308.364-.308l2.772.056c.261 0 .364.121.308.364l-3.752 14.7c-.355 1.325-.728 2.315-1.12 2.968a3.282 3.282 0 0 1-1.652 1.4c-.71.28-1.727.42-3.052.42h-.14zM85.474 26.7a.324.324 0 0 1-.098.238.324.324 0 0 1-.238.098H78.95c-.093 0-.14.047-.14.14v1.26c0 .579.159 1.055.476 1.428.317.373.728.56 1.232.56.43 0 .798-.135 1.106-.406.308-.27.509-.62.602-1.05.056-.187.177-.28.364-.28l2.492.112c.093 0 .173.033.238.098s.089.154.07.266c-.13 1.307-.607 2.31-1.428 3.01-.821.7-1.97 1.05-3.444 1.05-1.53 0-2.74-.406-3.626-1.218-.887-.812-1.33-1.918-1.33-3.318v-5.684c0-1.363.443-2.46 1.33-3.29.887-.83 2.095-1.246 3.626-1.246 1.53 0 2.74.415 3.626 1.246.887.83 1.33 1.927 1.33 3.29V26.7zm-4.956-5.432c-.504 0-.915.187-1.232.56-.317.373-.476.85-.476 1.428v1.26c0 .093.047.14.14.14h3.164c.093 0 .14-.047.14-.14v-1.26c0-.597-.159-1.078-.476-1.442-.317-.364-.737-.546-1.26-.546zM89.338 33a.324.324 0 0 1-.238-.098.324.324 0 0 1-.098-.238V13.736c0-.093.033-.173.098-.238a.324.324 0 0 1 .238-.098h2.576c.093 0 .173.033.238.098a.324.324 0 0 1 .098.238v18.928a.324.324 0 0 1-.098.238.324.324 0 0 1-.238.098h-2.576zm6.972 0a.324.324 0 0 1-.238-.098.324.324 0 0 1-.098-.238V13.736c0-.093.033-.173.098-.238a.324.324 0 0 1 .238-.098h2.576c.093 0 .173.033.238.098a.324.324 0 0 1 .098.238v18.928a.324.324 0 0 1-.098.238.324.324 0 0 1-.238.098H96.31zm11.508.224c-1.55 0-2.767-.41-3.654-1.232-.887-.821-1.33-1.932-1.33-3.332v-5.628c0-1.381.448-2.487 1.344-3.318.896-.83 2.11-1.246 3.64-1.246 1.55 0 2.772.415 3.668 1.246.896.83 1.344 1.937 1.344 3.318v5.628c0 1.4-.443 2.51-1.33 3.332-.887.821-2.114 1.232-3.682 1.232zm0-2.828c.523 0 .947-.182 1.274-.546.327-.364.49-.845.49-1.442v-5.152c0-.579-.163-1.055-.49-1.428-.327-.373-.751-.56-1.274-.56s-.943.182-1.26.546c-.317.364-.476.845-.476 1.442v5.152c0 .597.159 1.078.476 1.442.317.364.737.546 1.26.546zM118.738 33c-.205 0-.327-.103-.364-.308l-2.996-13.664v-.112c0-.168.103-.252.308-.252h2.464c.224 0 .345.103.364.308l1.456 8.708c.019.056.047.084.084.084.037 0 .065-.028.084-.084l1.54-8.708c.019-.205.14-.308.364-.308h2.184c.224 0 .345.103.364.308l1.568 8.736c.019.056.047.084.084.084.037 0 .065-.028.084-.084l1.484-8.736c.019-.205.14-.308.364-.308l2.436.056c.243 0 .336.121.28.364l-2.996 13.608c-.037.205-.159.308-.364.308h-2.52c-.224 0-.345-.103-.364-.308l-1.484-8.176c-.019-.056-.047-.084-.084-.084-.037 0-.065.028-.084.084l-1.456 8.176c-.019.205-.14.308-.364.308h-2.436z"/>
          <circle cx="25" cy="25" r="25" fill="#FFE603"/>
          <path fill="#1C1B19" fillRule="nonzero" d="M21.278 38.572c-.037 0-.075-.033-.112-.098a.473.473 0 0 1-.056-.238V36.22c0-.093.028-.173.084-.238a.252.252 0 0 1 .196-.098c.616-.019 1.101-.098 1.456-.238.355-.14.64-.41.854-.812.215-.401.369-.985.462-1.75l-.028-.168-3.528-13.888v-.112c0-.168.103-.252.308-.252h2.744c.224 0 .345.103.364.308l1.708 9.268c.019.056.047.084.084.084.037 0 .065-.028.084-.084l1.652-9.268c.019-.205.14-.308.364-.308l2.772.056c.261 0 .364.121.308.364l-3.752 14.7c-.355 1.325-.728 2.315-1.12 2.968a3.282 3.282 0 0 1-1.652 1.4c-.71.28-1.727.42-3.052.42h-.14z"/>
          <rect width="12" height="3" x="20" y="13" fill="#1C1B19" rx="1"/>
      </g>
    </svg>
  </LinkWrapper>
);

Logo.defaultProps = {
  theme: 'dark',
};

Logo.propTypes = {
  theme: PropTypes.string,
};

export default Logo;
