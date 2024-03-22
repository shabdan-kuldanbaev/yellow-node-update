import { ROUTES } from 'utils/constants';

export const typesDependencies = (type) => [
  ROUTES.aiChatbotDevelopmentServices.slug,
].includes(type);
