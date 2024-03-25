import { ROUTES } from 'utils/constants';

export const typesDependencies = (type) => [
  ROUTES.aiChatbotDevelopmentServices.slug,
  ROUTES.aiConsulting.slug,
].includes(type);
