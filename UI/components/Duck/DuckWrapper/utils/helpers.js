import { handleError } from 'utils/error';
import { three } from 'UI/components/Duck/utils/helpers';

export const loadDuck = async () => {
  try {
    return await new Promise((resolve) => {
      three.loadModel(resolve); // !
    });
  } catch (error) {
    handleError({
      error,
      message: 'Error in the loadDuck function',
    });
  }
};
