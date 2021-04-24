import fileToArrayBuffer from 'file-to-array-buffer';
import { API } from 'utils/api';

export const uploadFile = async (
  signed_url,
  file,
  onUploadProgress,
) => {
  try {
    const buffer = await fileToArrayBuffer(file);

    await API.uploadFile(
      signed_url,
      buffer,
      onUploadProgress,
    );
  } catch (error) {
    console.error('Error in the uploadFile function', { error });
  }
};
