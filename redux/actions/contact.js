import { actionTypes } from './actionTypes';

export const sendEmail = (payload) => ({
  type: actionTypes.SEND_EMAIL_PENDING,
  payload,
});

export const loadCompanyPeolpePhoto = (payload) => ({
  type: actionTypes.LOAD_COMPANY_PEOPLE_PHOTO_PENDING,
  payload,
});

export const loadOfficePhoto = (payload) => ({
  type: actionTypes.LOAD_OFFICE_PHOTO_PENDING,
  payload,
});
