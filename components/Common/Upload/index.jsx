import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedInput } from 'components';
import { Attach } from './Attach';
import unpinFile from './images/unpin.svg';
import styles from './styles.module.scss';

export const Upload = ({
  projectDescription,
  selectedFiles,
  handleOnDescriptionChange,
  handleOnSelectedFilesChange,
  handleOnUnpinFile,
  formKey,
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
        {selectedFiles && selectedFiles.map((file) => (
          <div className={styles.file} key={`file/${file.name}`}>
            <span>{file.name}</span>
            <span>{`${(file.size / 1024).toFixed(2)} kB`}</span>
            <button
              data-file-name={file.name}
              type="button"
              onClick={handleOnUnpinFile}
              style={{ backgroundImage: `url(${unpinFile})` }}
              aria-label="Unpin"
            />
          </div>
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
};
