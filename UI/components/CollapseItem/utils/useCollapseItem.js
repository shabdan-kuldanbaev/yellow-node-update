import { useState } from 'react';

export const useCollapseItem = ({ faq }) => {
  const [isAnswerOpened, setIsAnswerOpened] = useState(false);

  const handleOnQuestionClick = () => setIsAnswerOpened((prevState) => !prevState);

  return {
    faq,
    isAnswerOpened,
    handleOnQuestionClick,
  };
};
