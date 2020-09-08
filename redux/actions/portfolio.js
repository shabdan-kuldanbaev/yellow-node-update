import { actionTypes } from './actionTypes';

export const loadWorks = (payload) => ({
  type: actionTypes.LOAD_WORKS_PENDING,
  payload,
});

export const getProject = (payload) => ({
  type: actionTypes.GET_PROJECT_PENDING,
  payload,
});
