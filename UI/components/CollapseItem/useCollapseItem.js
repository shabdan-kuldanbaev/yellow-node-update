import { useState, useCallback } from 'react';

export const useCollapseItem = ({ faq }) => {
  const [isAnswerOpened, setIsAnswerOpened] = useState(false);

  const handleOnQuestionClick = useCallback(() => {
    setIsAnswerOpened((prevState) => !prevState);
  }, []);

  return {
    faq,
    isAnswerOpened,
    handleOnQuestionClick,
  };
};
