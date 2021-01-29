import { actionTypes } from './actionTypes';

export const sendEmail = (payload) => ({
  type: actionTypes.SEND_EMAIL_PENDING,
  payload,
});

export const fetchContactPage = (payload) => ({
  type: actionTypes.FETCH_CONTACT_DATA_PENDING,
  payload,
});
