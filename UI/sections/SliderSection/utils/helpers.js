import { ROUTES } from 'utils/constants';

export const typesDependencies = (type) => [
  ROUTES.aiChatbotDevelopmentServices.slug,
  ROUTES.aiStaffAugmentationServices.slug,
].includes(type);
