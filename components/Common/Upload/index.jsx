/* eslint-disable jsx-a11y/label-has-associated-control */
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Input from 'UI/components/Input';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { AttachedFile } from './AttachedFile';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const Upload = ({
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
        <Input
          value={projectDescription}
          handleOnChange={handleOnDescriptionChange}
          placeholder="Project Details *"
          isWithoutLabel
          isAttached
          isRequired
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

export default Upload;
