import { API } from 'utils/api';

export default (props) => {
  const {
    setFiles,
    register,
    dirtyFields,
    selectedFiles,
    formKey,
  } = props;

  const handleFilesChange = async ({ target: { files } }) => {
    try {
      const arrFiles = [];

      for (let i = 0; i < files.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const { data: signedUrl } = await API.getFileSignedURL(files[i].name);

        arrFiles.push({
          file: files[i],
          signedUrl,
          isUploaded: false,
        });
      }

      setFiles([...selectedFiles, ...arrFiles]);
    } catch (error) {
      console.error('Error in the handleOnSelectedFilesChange function', { error });
    }
  };

  const handleOnUnpinFile = ({ target: { dataset } }) => {
    setFiles(selectedFiles.filter((selectedFile) => selectedFile.file.name !== dataset.fileName));
  };

  const updateSelectedFileInfo = (signedUrl) => {
    const filesArray = selectedFiles.map((file) => {
      if (file.signedUrl === signedUrl) {
        file.isUploaded = true;
      }

      return file;
    });

    setFiles([...filesArray]);
  };

  return {
    formKey,
    register,
    dirtyFields,
    selectedFiles,
    handleFilesChange,
    handleOnUnpinFile,
    updateSelectedFileInfo,
  };
};
