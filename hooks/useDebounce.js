const useDebounce = (func, { delay = 500 }) => {
  let timer;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, delay);
  };
};

export default useDebounce;
