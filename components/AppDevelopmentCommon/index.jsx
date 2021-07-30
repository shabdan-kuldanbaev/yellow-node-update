import React from 'react';
import PropTypes from 'prop-types';
import { PageIntro } from 'components/CustomChatAppCommon/PageIntro';
import { ExperienceSection } from 'components/CustomChatAppCommon/ExperienceSection';
import { CardsSection } from 'components/CustomChatAppCommon/CardsSection';
import { AdvantagesSection } from 'components/CustomChatAppCommon/AdvantagesSection';
import { ChatFeaturesSection } from 'components/CustomChatAppCommon/ChatFeaturesSection';
import { TechnologiesSection } from 'components/CustomChatAppCommon/TechnologiesSection';
import { OurWorkSection } from 'components/CustomChatAppCommon/OurWorkSection';
import { getDocumentFields } from 'utils/helper';
import { BLOCKS_SLUGS } from 'utils/constants';

export const AppDevelopmentCommon = ({ section, handleOnCTAClick }) => {
  const { slug } = getDocumentFields(section);

  switch (slug) {
  case BLOCKS_SLUGS.chatAppPageIntro:
    return <PageIntro sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageExperiance:
    return <ExperienceSection sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageTypesOfChat:
    return (
      <CardsSection
        sectionData={section}
        type="chatTypes"
        hasCTAButton
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case BLOCKS_SLUGS.chatAppPageDevelopersAdvantages:
    return (
      <CardsSection
        sectionData={section}
        type="advantages"
      />
    );
  case BLOCKS_SLUGS.chatAppPageAdvantages:
    return <AdvantagesSection sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageFeatures:
    return <ChatFeaturesSection sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageTechnologies:
    return (
      <TechnologiesSection
        sectionData={section}
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case BLOCKS_SLUGS.chatAppPageOurWork:
    return <OurWorkSection sectionData={section} />;
  default:
    return null;
  }
};

AppDevelopmentCommon.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
};
