import { useEffect, useRef } from 'react';
import { setOverflowForBody } from 'utils/helper';

const useProps = ({
  show,
  close,
  ...props
}) => {
  const modalRef = useRef(null);

  const handleOnClick = ({ target }) => {
    if (!modalRef?.current.isEqualNode(target)) {
      return;
    }

    close();
  };

  useEffect(() => {
    setOverflowForBody(show);
  }, [show]);

  useEffect(() => {
    const handleOnKeyDown = ({ key }) => {
      if (key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleOnKeyDown);

    return () => document.removeEventListener('keydown', handleOnKeyDown);
  }, [close]);

  return {
    ...props,
    show,
    close,
    handleOnClick,
    modalRef,
  };
};

export default useProps;
