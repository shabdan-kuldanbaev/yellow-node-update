import React from 'react';
import PropTypes from 'prop-types';
import AnimatedInput from 'components/Common/AnimatedInput';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { AttachedFile } from './AttachedFile';
import styles from './styles.module.scss';

export const Upload = ({
  projectDescription,
  selectedFiles,
  handleOnDescriptionChange,
  handleOnSelectedFilesChange,
  handleOnUnpinFile,
  formKey,
  updateSelectedFileInfo,
  style,
}) => {
  const attachInputId = `files_${formKey}`;

  return (
    <div className={styles[style] || styles.uploadFile}>
      <div className={styles.attachmentManage}>
        <AnimatedInput
          value={projectDescription}
          handleOnChange={handleOnDescriptionChange}
          placeholder="Project details *"
          isValidate
          isWithoutLabel
          isAttached
          isTextArea
          style={style}
        />
        <label htmlFor={attachInputId}>
          <Svg type={SVG_IMAGES_TYPES.attachment} />
          <input
            id={attachInputId}
            type="file"
            onChange={handleOnSelectedFilesChange}
            multiple
            className={styles.hide}
          />
        </label>
      </div>
      <hr />
      <div className={styles.attachedFiles}>
        {selectedFiles && selectedFiles.map((file) => (
          <AttachedFile
            key={file.signedUrl}
            handleOnUnpinFile={handleOnUnpinFile}
            currentFile={file}
            updateSelectedFileInfo={updateSelectedFileInfo}
          />
        ))}
        {selectedFiles && !!selectedFiles.length && (
          <div className={styles.moreFilesLink}>
            <label htmlFor={`${attachInputId}/add-more`}>
              add more files
              <input
                id={`${attachInputId}/add-more`}
                type="file"
                onChange={handleOnSelectedFilesChange}
                multiple
                className={styles.hide}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

Upload.defaultProps = {
  style: '',
};

Upload.propTypes = {
  projectDescription: PropTypes.string.isRequired,
  selectedFiles: PropTypes.instanceOf(Array).isRequired,
  handleOnDescriptionChange: PropTypes.func.isRequired,
  handleOnSelectedFilesChange: PropTypes.func.isRequired,
  handleOnUnpinFile: PropTypes.func.isRequired,
  formKey: PropTypes.string.isRequired,
  updateSelectedFileInfo: PropTypes.func.isRequired,
  style: PropTypes.string,
};
