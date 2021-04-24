import { actionTypes } from './actionTypes';

export const sendEmail = (payload) => ({
  type: actionTypes.SEND_FORM_DATA_PENDING,
  payload,
});

export const setIsFormDataSent = (payload) => ({
  type: actionTypes.SET_IS_FORM_DATA_SENT,
  payload,
});
