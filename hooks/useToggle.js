import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((outerValue) => {
    setValue(outerValue || ((v) => !v));
  }, []);

  return [value, toggle];
}

export default useToggle;
