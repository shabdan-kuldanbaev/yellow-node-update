export const isExternal = (path) => {
  try {
    const _ = new URL(path);

    return true;
  } catch {
    return false;
  }
};
