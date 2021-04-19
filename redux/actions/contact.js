import { actionTypes } from './actionTypes';

export const sendEmail = (payload) => ({
  type: actionTypes.SEND_EMAIL_PENDING,
  payload,
});

export const setIsCcontactsSent = (payload) => ({
  type: actionTypes.SET_IS_CONTACTS_SENT,
  payload,
});
