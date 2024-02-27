'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { uploadFile } from 'utils/uploadUtils';
import { getConvertedFileSize, staticImagesUrls } from 'utils/helper';
import LinearWrapper from './LinearWrapper';
import styles from './styles.module.scss';

export const AttachedFile = (props) => {
  const {
    currentFile: {
      file,
      signedUrl,
    },
    handleOnUnpinFile,
    updateSelectedFileInfo,
  } = props;

  const [progressInfo, setProgressInfo] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  useEffect(() => {
    if (isFileUploaded) return;

    let progress;

    uploadFile(
      signedUrl,
      file,
      (event) => {
        progress = (Math.round((100 * event.loaded) / event.total));
        setProgressInfo(progress);

        if (progress === 100) {
          updateSelectedFileInfo(signedUrl);
          setIsFileUploaded(true);
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.file}
      key={`file/${file.name}`}
    >
      <span className={cn(styles.uploading, {
        [styles.successUploading]: isFileUploaded,
      })}
      >
        {file.name}
      </span>
      <span className={cn(styles.uploading, {
        [styles.successUploading]: isFileUploaded,
      })}
      >
        {getConvertedFileSize(file.size)}
      </span>
      <button
        className={cn(styles.uploading, {
          [styles.successUploading]: isFileUploaded,
        })}
        style={{ backgroundImage: `url(${staticImagesUrls.unpinFile})` }}
        data-file-name={file.name}
        type="button"
        onClick={handleOnUnpinFile}
        disabled={!isFileUploaded}
        aria-label="Unpin"
      />
      <LinearWrapper
        value={progressInfo}
        className={cn(styles.linearUploading, {
          [styles.linearSuccessUploading]: isFileUploaded,
        })}
      />
    </div>
  );
};

AttachedFile.propTypes = {
  currentFile: PropTypes.shape({
    file: PropTypes.instanceOf(Object).isRequired,
    signedUrl: PropTypes.string.isRequired,
  }).isRequired,
  handleOnUnpinFile: PropTypes.func.isRequired,
  updateSelectedFileInfo: PropTypes.func.isRequired,
};
