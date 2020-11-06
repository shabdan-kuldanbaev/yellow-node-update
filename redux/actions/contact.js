import { actionTypes } from './actionTypes';

export const sendEmail = (payload) => ({
  type: actionTypes.SEND_EMAIL_PENDING,
  payload,
});
