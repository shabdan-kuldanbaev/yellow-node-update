import { CASE_STUDIES } from 'utils/constants';

const caseResulrWithVideo = [CASE_STUDIES.fairy];

export const isResultHasVideo = (type) => caseResulrWithVideo.includes(type);
