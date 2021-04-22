import fileToArrayBuffer from 'file-to-array-buffer';
import axios from 'axios';
import { API } from 'utils/api';

export const uploadFile = async (
  signed_url,
  file,
  onUploadProgress,
) => {
  const buffer = await fileToArrayBuffer(file);

  await axios.put(
    signed_url,
    buffer,
    { onUploadProgress },
  );
};

export const getFileSignedUrl = async (fileName) => {
  const { data } = await API.getSignedURL(fileName);

  return data;
};
