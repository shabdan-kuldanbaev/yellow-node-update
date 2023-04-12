import dynamic from 'next/dynamic';
import TextField from 'UI/components/TextField';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { AttachedFile } from './AttachedFile';
import useUpload from './utils/useUpload';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const Upload = (props) => {
  const {
    register,
    dirtyFields,
    selectedFiles,
    formKey,
    handleFilesChange,
    handleOnUnpinFile,
    updateSelectedFileInfo,
  } = useUpload(props);

  const inputId = `files_${formKey}`;

  return (
    <div className={styles.uploadFile}>
      <div className={styles.attachmentManage}>
        <TextField
          name="description"
          register={register}
          placeholder="Description *"
          errorMessage="Required field"
          required={dirtyFields?.description}
          attached
          textarea
        />
        <label htmlFor={inputId}>
          <Svg type={SVG_IMAGES_TYPES.attachment} />
          <input
            id={inputId}
            type="file"
            onChange={handleFilesChange}
            multiple
            className={styles.hide}
          />
        </label>
      </div>
      <div className={styles.attachedFiles}>
        {selectedFiles?.map((file) => (
          <AttachedFile
            key={file.signedUrl}
            handleOnUnpinFile={handleOnUnpinFile}
            currentFile={file}
            updateSelectedFileInfo={updateSelectedFileInfo}
          />
        ))}
        {selectedFiles && !!selectedFiles?.length && (
          <div className={styles.moreFilesLink}>
            <label htmlFor={`${inputId}/add-more`}>
              add more files
              <input
                id={`${inputId}/add-more`}
                type="file"
                onChange={handleFilesChange}
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
