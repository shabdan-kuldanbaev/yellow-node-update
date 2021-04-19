import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnimatedInput } from 'components';
import { Attach } from './Attach';
import styles from './styles.module.scss';
import { AttachedFile } from './AttachedFile';

export const Upload = ({
  projectDescription,
  selectedFiles,
  handleOnDescriptionChange,
  handleOnSelectedFilesChange,
  handleOnUnpinFile,
  formKey,
  updateSelectedFilesInfo,
}) => {
  const attachInputId = `files_${formKey}`;

  return (
    <div className={styles.uploadFile}>
      <div className={styles.attachmentManage}>
        <AnimatedInput
          value={projectDescription}
          handleOnChange={handleOnDescriptionChange}
          placeholder="Project details *"
          isValidate
          isWithoutLabel
          isAttached
          isTextArea
        />
        <label htmlFor={attachInputId}>
          <Attach />
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
        {selectedFiles && selectedFiles.map((file, index) => (
          <AttachedFile
            key={file.signedUrl}
            handleOnUnpinFile={handleOnUnpinFile}
            currentFile={file}
            updateSelectedFilesInfo={updateSelectedFilesInfo}
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

Upload.propTypes = {
  projectDescription: PropTypes.string.isRequired,
  selectedFiles: PropTypes.instanceOf(Array).isRequired,
  handleOnDescriptionChange: PropTypes.func.isRequired,
  handleOnSelectedFilesChange: PropTypes.func.isRequired,
  handleOnUnpinFile: PropTypes.func.isRequired,
  formKey: PropTypes.string.isRequired,
  updateSelectedFilesInfo: PropTypes.func.isRequired,
};
