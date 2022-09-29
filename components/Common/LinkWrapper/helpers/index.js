import { CUSTOM_DOMAIN } from 'utils/constants';

export const isExternal = (path) => {
  if (path.includes(CUSTOM_DOMAIN)) {
    return false;
  }

  try {
    const _ = new URL(path);

    return true;
  } catch {
    return false;
  }
};
