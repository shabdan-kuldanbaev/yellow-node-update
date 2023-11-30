import { getDocumentFields } from 'utils/helper';

export default (props) => {
  const {
    socialLinks = [],
    ...rest
  } = props;

  const socialMedia = socialLinks.map((link) => getDocumentFields(link, ['svgType', 'url']));

  return {
    socialMedia,
    ...rest,
  };
};
