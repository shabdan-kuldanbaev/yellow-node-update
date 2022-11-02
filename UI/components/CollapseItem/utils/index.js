import { useState, useCallback } from 'react';

export const useCollapseItem = () => {
  const [isAnswerOpened, setIsAnswerOpened] = useState(false);

  const handleOnQuestionClick = useCallback(() => {
    setIsAnswerOpened((prevState) => !prevState);
  }, []);

  return {
    isAnswerOpened,
    handleOnQuestionClick,
  };
};
