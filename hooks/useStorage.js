import {
  useCallback,
  useEffect,
  useState,
} from 'react';

const useStorage = ({
  storage = window.sessionStorage,
  key,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (!storage || !key) {
      return;
    }

    setValue(JSON.parse(storage.getItem(key)) || defaultValue);
  }, [defaultValue, key, storage]);

  const setItem = useCallback((itemValue) => {
    if (!storage || !key) {
      return;
    }

    setValue(itemValue);
    storage.setItem(key, JSON.stringify(itemValue));
  }, [key, storage]);

  return [value, setItem];
};

export default useStorage;
