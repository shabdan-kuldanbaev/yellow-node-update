export const setWithExpiry = (key, value, expiration) => {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + expiration,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);

    return null;
  }

  return item.value;
};
