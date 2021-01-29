import { actionTypes } from './actionTypes';

export const loadTeam = (payload) => ({
  type: actionTypes.LOAD_TEAM_PENDING,
  payload,
});

export const loadSpecial = (payload) => ({
  type: actionTypes.LOAD_SPECIAL_PENDING,
  payload,
});

export const fetchCompanyPage = (payload) => ({
  type: actionTypes.FETCH_COMPANY_DATA_PENDING,
  payload,
});
