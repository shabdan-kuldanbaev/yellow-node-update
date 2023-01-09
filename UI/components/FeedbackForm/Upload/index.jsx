import React from 'react';
import Svg from 'UI/components/Svg';
import TextField from 'UI/components/TextField';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { AttachedFile } from './AttachedFile';
import styles from './styles.module.scss';

const Upload = (props) => {
  const {
    register,
    dirtyFields,
    files,
    formKey,
    onChange,
    handleOnUnpinFile,
    updateSelectedFileInfo,
  } = props;

  const inputId = `files_${formKey}`;

  return (
    <div className={styles.uploadFile}>
      <div className={styles.attachmentManage}>
        <TextField
          name="name"
          register={register}
          placeholder="Name *"
          errorMessage="Invalid email"
          required={dirtyFields?.description}
        />
        <label htmlFor={inputId}>
          <Svg type={SVG_IMAGES_TYPES.attachment} />
          <input
            id={inputId}
            type="file"
            onChange={onChange}
            multiple
            className={styles.hide}
          />
        </label>
      </div>
      <hr />
      <div className={styles.attachedFiles}>
        {files?.map((file) => (
          <AttachedFile
            key={file.signedUrl}
            handleOnUnpinFile={handleOnUnpinFile}
            currentFile={file}
            updateSelectedFileInfo={updateSelectedFileInfo}
          />
        ))}
        {files && !!files?.length && (
          <div className={styles.moreFilesLink}>
            <label htmlFor={`${inputId}/add-more`}>
              add more files
              <input
                id={`${inputId}/add-more`}
                type="file"
                onChange={onChange}
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

export default Upload;
