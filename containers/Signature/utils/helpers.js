import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const getSignatureProps = (props) => {
  const {
    title: signatureGeneratorTitle = '',
    contentModules: inputsList = [],
  } = getDocumentFields(
    props[0],
    [
      'title',
      'contentModules',
    ],
  );
  const {
    text: content,
    title: signatureGeneratedTitle,
    contentList: titledList,
    images,
  } = getDocumentFields(
    props[1],
    [
      'title',
      'contentList',
      'text',
      'images',
    ],
  );
  const bottomText = get(content, [
    'content',
    '0',
    'content',
    '0',
    'value',
  ], '');
  const yellowUrl = getFileUrl(images[0]);
  const telegramUrl = getFileUrl(images[1]);

  return {
    signatureGeneratorTitle,
    inputsList,
    signatureGeneratedTitle,
    titledList,
    yellowUrl,
    telegramUrl,
    bottomText,
  };
};

export const getEmployeeInfo = (formRef) => {
  const employee = (get(formRef, [
    'current',
    '0',
    'value',
  ], ''));
  const employeeJob = (get(formRef, [
    'current',
    '1',
    'value',
  ], ''));
  const employeeMail = (get(formRef, [
    'current',
    '2',
    'value',
  ], ''));
  const employeeTelegram = ((get(formRef, [
    'current',
    '3',
    'value',
  ], '')));

  return {
    employee,
    employeeJob,
    employeeMail,
    employeeTelegram,
  };
};

export const getInputsData = (inputItem) => {
  const {
    title: placeholder,
    text,
  } = getDocumentFields(
    inputItem,
    [
      'title',
      'text',
    ],
  );
  const type = get(text, [
    'content',
    '0',
    'content',
    '0',
    'value',
  ], 'text');

  return { placeholder, type };
};
