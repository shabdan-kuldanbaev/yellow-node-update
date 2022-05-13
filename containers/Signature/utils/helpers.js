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
    title: signatureGeneratedTitle,
    contentList: titledList,
    images,
  } = getDocumentFields(
    props[1],
    [
      'title',
      'contentList',
      'images',
    ],
  );

  const yellowUrl = getFileUrl(images[0]);
  const linkedInImgUrl = getFileUrl(images[1]);
  const instagramImgUrl = getFileUrl(images[2]);
  const twitterImgUrl = getFileUrl(images[3]);

  return {
    signatureGeneratorTitle,
    inputsList,
    signatureGeneratedTitle,
    titledList,
    yellowUrl,
    linkedInImgUrl,
    instagramImgUrl,
    twitterImgUrl,
  };
};

export const getEmployeeInfo = (formRef) => {
  const getEmployee = (index) => get(formRef, `current.${index}.value`, '');

  return {
    employee: getEmployee(0),
    employeeJob: getEmployee(1),
    employeeMail: getEmployee(2),
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
