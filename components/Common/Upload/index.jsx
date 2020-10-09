import React, { useState } from 'react';
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
}) =>
// const [selectedFiles, setFile] = useState([]);
// const [projectDescription, setDescription] = useState('');

// const handleOnChange = ({ target: { files } }) => {
//   const arrFiles = [];
//   for (let i = 0; i < files.length; i += 1) arrFiles.push(files[i]);
//   setFile(arrFiles);
// };

// const handleOnUnpinFile = ({ target: { dataset } }) => {
//   setFile(selectedFiles.filter((file) => file.name !== dataset.fileName));
// };

// const handleOnDescChange = ({ target: { value } }) => {
//   setDescription(value);
// };

  (
    <div className={styles.uploadFile}>
      <div className={styles.attachmentManage}>
        <AnimatedInput
          value={projectDescription}
          handleOnChange={handleOnDescriptionChange}
          placeholder="Project details (optional)"
          isValidate
          isWithoutLabel
          isAttached
        />
        <label htmlFor="files">
          <Attach />
        </label>
        <input
          id="files"
          type="file"
          onChange={handleOnSelectedFilesChange}
          multiple
          className={styles.hide}
        />
      </div>
      <hr />
      <div className={styles.attachedFiles}>
        {selectedFiles.map((file, index) => (
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
};
