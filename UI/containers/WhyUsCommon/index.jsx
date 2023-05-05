import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { getDocumentFields } from 'utils/helper';
import { WHY_US_TYPE } from 'utils/constants';

const Parallax = dynamic(() => import('UI/sections/CaseParallax'));
const CardsSection = dynamic(() => import('UI/sections/CardsSection'));
const FeedbackSection = dynamic(() => import('UI/sections/FeedbackSection'));
const SvgListSection = dynamic(() => import('UI/sections/SvgListSection'), { ssr: false });
const ImageSection = dynamic(() => import('UI/sections/ImageSection'));
const WhyUsIntro = dynamic(() => import('UI/sections/WhyUsIntro'));

export const WhyUsCommon = (props) => {
  const { type, section } = props;

  if (!section.fields) {
    return null;
  }

  const { type: sectionType } = getDocumentFields(section, ['type']);

  switch (sectionType) {
  case WHY_US_TYPE.intro:
    return (
      <WhyUsIntro {...props} />
    );

  case WHY_US_TYPE.imageSection:
    return (
      <ImageSection {...props} />
    );

  case WHY_US_TYPE.cardsSection:
    return <CardsSection {...props} />;

  case WHY_US_TYPE.svgList:
    return (
      <SvgListSection {...props} />
    );

  case WHY_US_TYPE.cardsWithOverlay:
    return (
      <CardsSection
        section={section}
        type={type}
        withOverlay
      />
    );

  case WHY_US_TYPE.parallax:
    return (
      <Parallax
        type={type}
        data={section.fields}
      />
    );

  case WHY_US_TYPE.feedback:
    return <FeedbackSection {...props} />;

  default:
    return null;
  }
};

WhyUsCommon.defaultProps = {
  handleOnCTAClick: () => {
  },
};

WhyUsCommon.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};
