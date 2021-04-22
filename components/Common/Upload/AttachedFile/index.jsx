import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { uploadFile } from 'utils/fileUploadingUtils';
import { getConvertedFileSize, staticImagesUrls } from 'utils/helper';
import { LinearWrapper } from './LinearWrapper';
import styles from './styles.module.scss';

export const AttachedFile = ({
  currentFile,
  handleOnUnpinFile,
  updateSelectedFilesInfo,
}) => {
  const [progressInfo, setProgressInfo] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const { file, signedUrl } = currentFile;

  useEffect(() => {
    if (!isFileUploaded) {
      let progress;

      uploadFile(
        signedUrl,
        file,
        (event) => {
          progress = (Math.round((100 * event.loaded) / event.total));
          setProgressInfo(progress);

          if (progress === 100) {
            updateSelectedFilesInfo(signedUrl);
            setIsFileUploaded(true);
          }
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.file} key={`file/${file.name}`}>
      <span className={cn(styles.uploading, { [styles.successUploading]: isFileUploaded })}>{file.name}</span>
      <span className={cn(styles.uploading, { [styles.successUploading]: isFileUploaded })}>{getConvertedFileSize(file.size)}</span>
      <button
        data-file-name={file.name}
        type="button"
        onClick={handleOnUnpinFile}
        style={{ backgroundImage: `url(${staticImagesUrls.unpinFile})` }}
        className={cn(styles.uploading, { [styles.successUploading]: isFileUploaded })}
        disabled={!isFileUploaded}
        aria-label="Unpin"
      />
      <LinearWrapper
        variant="determinate"
        value={progressInfo}
        className={cn(styles.linearUploading, {
          [styles.linearSuccessUploading]: isFileUploaded,
        })}
      />
    </div>
  );
};

AttachedFile.propTypes = {
  currentFile: PropTypes.instanceOf(Object).isRequired,
  handleOnUnpinFile: PropTypes.func.isRequired,
  updateSelectedFilesInfo: PropTypes.func.isRequired,
};
