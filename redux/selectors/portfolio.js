import { DEFAULT_WORK_TYPE } from 'utils/constants';

export const selectProject = (state) => state.portfolio.project;

export const selectTags = (state) => state.portfolio.tags;

export const selectTypes = (state) => [DEFAULT_WORK_TYPE, ...state.portfolio.types];
