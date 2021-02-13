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
}) => (
  <div className={styles.uploadFile}>
    <div className={styles.attachmentManage}>
      <AnimatedInput
        value={projectDescription}
        handleOnChange={handleOnDescriptionChange}
        placeholder="Project details *"
        isValidate
        isWithoutLabel
        isAttached
      />
      <label htmlFor={`files_${formKey}`}>
        <Attach />
      </label>
      <input
        id={`files_${formKey}`}
        type="file"
        onChange={handleOnSelectedFilesChange}
        multiple
        className={styles.hide}
      />
    </div>
    <hr />
    <div className={styles.attachedFiles}>
      {selectedFiles && selectedFiles.map((file, index) => (
        <div className={styles.file} key={`file/${index}`}>
          <span>{file.name}</span>
          <span>{`${(file.size / 1024).toFixed(2)} kB`}</span>
          <button
            data-file-name={file.name}
            type="button"
            onClick={handleOnUnpinFile}
            style={{ backgroundImage: `url(${unpinFile})` }}
          />
        </div>
      ))}
    </div>
  </div>
);

Upload.propTypes = {
  projectDescription: PropTypes.string.isRequired,
  selectedFiles: PropTypes.instanceOf(Array).isRequired,
  handleOnDescriptionChange: PropTypes.func.isRequired,
  handleOnSelectedFilesChange: PropTypes.func.isRequired,
  handleOnUnpinFile: PropTypes.func.isRequired,
  formKey: PropTypes.string.isRequired,
};
